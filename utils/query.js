export const create = {
  planta: "CREATE TABLE IF NOT EXISTS PLANTA (id INTEGER PRIMARY KEY AUTOINCREMENT,nombre VARCHAR(100) UNIQUE,url VARCHAR(200) DEFAULT '');",
  caracteristica: "CREATE TABLE IF NOT EXISTS CARACTERISTICA (id INTEGER PRIMARY KEY AUTOINCREMENT,tipo VARCHAR(100) UNIQUE);",
  fecha: "CREATE TABLE IF NOT EXISTS FECHA (id INTEGER PRIMARY KEY AUTOINCREMENT,fecha DATE UNIQUE);",
  vista: "CREATE TABLE IF NOT EXISTS VISTA (idPlanta INTEGER,idCaracteristica INTEGER,idFecha INTEGER,descripcion TEXT,PRIMARY KEY (idPlanta, idCaracteristica, idFecha),FOREIGN KEY (idPlanta) REFERENCES PLANTA(id),FOREIGN KEY (idCaracteristica) REFERENCES CARACTERISTICA(id),FOREIGN KEY (idFecha) REFERENCES FECHA(id));",
}

export const insert = {
  PLANTA: "INSERT INTO PLANTA (nombre) VALUES (?);",
  CARACTERISTICA: "INSERT INTO CARACTERISTICA (tipo) VALUES (?);",
  FECHA: "INSERT INTO FECHA (fecha) VALUES (?);",
  VISTA: "INSERT INTO VISTA (idPlanta, idCaracteristica, idFecha, descripcion) VALUES (?,?,?,?);",
}

export const select = {
  PLANTA: "SELECT * FROM PLANTA ORDER BY nombre;",
  CARACTERISTICA: "SELECT * FROM CARACTERISTICA ORDER BY tipo;",
  FECHA: "SELECT * FROM FECHA ORDER BY fecha DESC;",
  VISTA: "SELECT * FROM VISTA;",
}

export const update = {
  PLANTA: "UPDATE PLANTA SET nombre = ? WHERE id = ?;",
  CARACTERISTICA: "UPDATE CARACTERISTICA SET tipo = ? WHERE id = ?;",
  FECHA: "UPDATE FECHA SET fecha = ? WHERE id = ?;",
  VISTA: "UPDATE VISTA SET descripcion = ? WHERE idPlanta = ? AND idCaracteristica = ? AND idFecha = ?;",
  IMAGE: "UPDATE PLANTA SET url = ? WHERE id = ?;",
}

export const homeLoad = "SELECT P.id, P.nombre, P.url FROM (SELECT DISTINCT idPlanta FROM VISTA WHERE idFecha = ?) V JOIN PLANTA P on P.id = V.idPlanta ORDER BY P.nombre;"
export const infoLoad = "SELECT C.id, C.tipo, V.descripcion FROM (SELECT DISTINCT idCaracteristica, descripcion FROM VISTA WHERE idPlanta = ? AND idFecha = ?) V JOIN CARACTERISTICA C ON C.id = V.idCaracteristica ORDER BY C.tipo;"

export const toCSV = {
  plant: "SELECT C.tipo, V.descripcion FROM (SELECT * FROM VISTA WHERE idPlanta = ? AND idFecha = ?) V JOIN CARACTERISTICA C ON C.id = V.idCaracteristica ORDER BY C.tipo;",
  date: "SELECT V.nombre, C.tipo, V.descripcion FROM (SELECT X.nombre, X.idCaracteristica, V.descripcion FROM (SELECT P.nombre, V.idCaracteristica, V.idFecha, P.id FROM (SELECT DISTINCT idCaracteristica, idFecha FROM VISTA WHERE idFecha = ?) V JOIN PLANTA P ON P.id IN (SELECT DISTINCT idPlanta FROM VISTA WHERE idFecha = V.idFecha)) X LEFT JOIN VISTA V ON X.idCaracteristica = V.idCaracteristica AND V.idFecha = X.idFecha AND V.idPlanta = X.id) V JOIN CARACTERISTICA C ON C.id = V.idCaracteristica ORDER BY V.nombre, C.tipo;"
}