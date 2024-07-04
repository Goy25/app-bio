export const getIndividuals = async (
  db,
  plantId,
  day,
  place,
  month,
  year,
  setIndividuals
) => {
  const individuals = await db.getAllAsync(
    "SELECT I.id, I.esteril, I.brotes, I.flores, I.frutosInmaduros, I.frutosMaduros, I.observaciones FROM (SELECT * FROM INDIVIDUO WHERE idPlanta = ? AND dia = ?) I INNER JOIN VISTA V ON V.idIndividuo = I.id and V.idLugar = ? INNER JOIN (SELECT id FROM PERIODO WHERE mes = ? AND anio = ?) P ON P.id = V.idPeriodo;",
    [plantId, day, place, month, year]
  );
  setIndividuals(individuals);
};

export const insertIndividual = async (
  db,
  year,
  month,
  day,
  plantId,
  place,
  setReload
) => {
  let periodId, individualId;
  const period = await db.getAllAsync(
    "SELECT * FROM PERIODO WHERE anio = ? AND mes = ?;",
    [year, month]
  );
  if (period.length === 0) {
    const res = await db.runAsync(
      "INSERT INTO PERIODO (anio, mes) VALUES (?, ?);",
      [year, month]
    );
    periodId = res.lastInsertRowId;
  } else {
    periodId = period[0].id;
  }
  const resIndividual = await db.runAsync(
    "INSERT INTO INDIVIDUO (idPlanta, dia) VALUES (?, ?);",
    [plantId, day]
  );
  individualId = resIndividual.lastInsertRowId;
  await db.runAsync(
    "INSERT INTO VISTA (idIndividuo, idLugar, idPeriodo) VALUES (?, ?, ?);",
    [individualId, place, periodId]
  );
  setReload((prev) => !prev);
};