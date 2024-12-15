CREATE DATABASE IF NOT EXISTS `f1db`;

CREATE TABLE IF NOT EXISTS piloto (
  id_piloto INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50),
  apellido VARCHAR(50),
  nacionalidad VARCHAR(50),
  fecha_nacimiento DATE
);

CREATE TABLE IF NOT EXISTS equipo (
  id_equipo INT AUTO_INCREMENT PRIMARY KEY,
  nombre_equipo VARCHAR(100),
  pais_base VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS circuito (
  id_circuito INT AUTO_INCREMENT PRIMARY KEY,
  nombre_circuito VARCHAR(100),
  pais VARCHAR(50),
  longitud_km DECIMAL(5,2)
);

CREATE TABLE IF NOT EXISTS temporada (
  id_temporada INT AUTO_INCREMENT PRIMARY KEY,
  anio INT,
  descripcion VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS resultado (
  id_resultado INT AUTO_INCREMENT PRIMARY KEY,
  id_piloto INT,
  id_equipo INT,
  id_circuito INT,
  id_temporada INT,
  posicion_final INT,
  puntos_obtenidos DECIMAL(5,2),
  FOREIGN KEY (id_piloto) REFERENCES piloto(id_piloto),
  FOREIGN KEY (id_equipo) REFERENCES equipo(id_equipo),
  FOREIGN KEY (id_circuito) REFERENCES circuito(id_circuito),
  FOREIGN KEY (id_temporada) REFERENCES temporada(id_temporada)
);
