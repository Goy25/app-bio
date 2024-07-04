export const getPeriods = async (db, setPeriods) => {
  const periods = await db.getAllAsync(
    "SELECT id, anio,mes FROM PERIODO ORDER BY anio DESC, mes DESC;"
  );
  setPeriods(
    periods.map((period) => {
      const date = `${period.anio}-${`${period.mes}`.padStart(2, 0)}`;
      return {
        label: date,
        value: period.id,
        filter: date,
      };
    })
  );
};

export const exportAll = async (db) => {
  return await db.getAllAsync(`
SELECT P.nombre,P.familia,P.idB,P.colecta,P.obs,COALESCE(F.urls, '') AS urls,I.dia,I.esteril,I.brotes,I.flores,I.frutosInmaduros,I.frutosMaduros,I.observaciones,X.anio,X.mes,L.nombre as lugar
FROM PLANTA P
LEFT JOIN (
  SELECT idPlanta, GROUP_CONCAT(uri, '|-*-|') as urls
  FROM FOTO
  GROUP BY idPlanta 
) F
ON P.id = F.idPlanta
JOIN INDIVIDUO I
ON P.id = I.idPlanta
JOIN VISTA V
ON I.id = V.idIndividuo
JOIN LUGAR L
ON V.idLugar = L.id
JOIN PERIODO X
ON V.idPeriodo = X.id
ORDER BY X.anio DESC, X.mes DESC, I.dia DESC, L.nombre, P.nombre;
`);
};

export const exportPeriod = async (db, id) => {
  return await db.getAllAsync(
    `
SELECT P.nombre,P.familia,P.idB,P.colecta,P.obs,COALESCE(F.urls, '') AS urls,I.dia,I.esteril,I.brotes,I.flores,I.frutosInmaduros,I.frutosMaduros,I.observaciones,L.nombre as lugar
FROM PLANTA P
LEFT JOIN (
  SELECT idPlanta, GROUP_CONCAT(uri, '|-*-|') as urls
  FROM FOTO
  GROUP BY idPlanta 
) F
ON P.id = F.idPlanta
JOIN INDIVIDUO I
ON P.id = I.idPlanta
JOIN VISTA V
ON I.id = V.idIndividuo
JOIN LUGAR L
ON V.idLugar = L.id AND V.idPeriodo = ?
ORDER BY I.dia DESC, L.nombre, P.nombre;
`,
    [id]
  );
};

export const importData = async (db, data, setVisibility, setArc) => {
  try {
    for (const [plant, info] of Object.entries(data.plants)) {
      const rows = await db.getAllAsync(
        "SELECT * FROM PLANTA WHERE nombre = ?;",
        [plant]
      );
      if (rows.length === 0) {
        const inserted = await db.runAsync(
          "INSERT INTO PLANTA (nombre,familia,idB,colecta,obs) VALUES (?,?,?,?,?);",
          [plant, info.familia, info.idB, info.colecta, info.obs]
        );
        data.plants[plant].id = inserted.lastInsertRowId;
        if (info.url) {
          info.urls = [
            info.url.length === 0 ? "" : `data:imagejpeg;base64,${info.url}`,
          ];
        }
        if (info.urls && (info.urls.length > 1 || info.urls[0].length > 0)) {
          for (const url of info.urls) {
            await db.runAsync("INSERT INTO FOTO (idPlanta,uri) VALUES (?,?);", [
              inserted.lastInsertRowId,
              url,
            ]);
          }
        }
      } else {
        data.plants[plant].id = rows[0].id;
      }
    }
    for (const place in data.places) {
      const rows = await db.getAllAsync(
        "SELECT * FROM LUGAR WHERE nombre = ?;",
        [place]
      );
      if (rows.length === 0) {
        const inserted = await db.runAsync(
          "INSERT INTO LUGAR (nombre) VALUES (?);",
          [place]
        );
        data.places[place] = inserted.lastInsertRowId;
      } else {
        data.places[place] = rows[0].id;
      }
    }
    for (const period in data.periods) {
      const [year, month] = period.split("-").map((x) => parseInt(x));
      const rows = await db.getAllAsync(
        "SELECT * FROM PERIODO WHERE anio = ? AND mes = ?;",
        [year, month]
      );
      if (rows.length === 0) {
        const inserted = await db.runAsync(
          "INSERT INTO PERIODO (anio,mes) VALUES (?,?);",
          period.split("-")
        );
        data.periods[period] = inserted.lastInsertRowId;
      } else {
        data.periods[period] = rows[0].id;
      }
    }
    for (const individual of data.individuals) {
      const inserted = await db.runAsync(
        "INSERT INTO INDIVIDUO (dia,idPlanta,esteril,brotes,flores,frutosInmaduros,frutosMaduros,observaciones) VALUES (?,?,?,?,?,?,?,?);",
        [
          individual.dia,
          data.plants[individual.plant].id,
          individual.esteril,
          individual.brotes,
          individual.flores,
          individual.frutosInmaduros,
          individual.frutosMaduros,
          individual.observaciones,
        ]
      );
      await db.runAsync(
        "INSERT INTO VISTA (idIndividuo,idLugar,idPeriodo) VALUES (?,?,?);",
        [
          inserted.lastInsertRowId,
          data.places[individual.place],
          data.periods[individual.period],
        ]
      );
    }
    setVisibility(false);
    setArc("");
  } catch (error) {
    alert("Error al importar los datos");
    setVisibility(false);
    console.log(error);
  }
};
