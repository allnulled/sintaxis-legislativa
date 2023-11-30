CREATE TABLE Ley (
  nombre VARCHAR(2048) UNIQUE PRIMARY KEY,
  padre VARCHAR(2048),
  contenido TEXT,
  detalles TEXT,
  modificacion_de_ley VARCHAR(2048),
  FOREIGN KEY (nombre_de_modificacion_de_ley) REFERENCES Modificacion_de_ley (nombre)
);

CREATE TABLE Modificacion_de_ley (
  nombre VARCHAR(2048) UNIQUE PRIMARY KEY,
  detalles TEXT
);