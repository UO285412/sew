<?php
// Clase Conexion
class Conexion {
    private $server;
    private $user;
    private $pass;
    private $dbname;
    public $conn;

    public function __construct() {
        $this->server = "localhost";
        $this->user = "DBUSER2024";
        $this->pass = "DBPSWD2024";
        $this->dbname = "f1db";

        $this->conn = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

        if ($this->conn->connect_error) {
            die("Conexión fallida: " . $this->conn->connect_error);
        }
    }
}

// Clase DatabaseManager
class DatabaseManager {
    private $conn;

    public function __construct($host, $user, $pass, $dbname) {
        $this->conn = new mysqli($host, $user, $pass, $dbname);

        if ($this->conn->connect_error) {
            die("Error de conexión: " . $this->conn->connect_error);
        }
    }

    public function connect() {
        return $this->conn;
    }

    public function query($sql) {
        return $this->conn->query($sql);
    }

    public function prepare($sql) {
        return $this->conn->prepare($sql);
    }

    public function close() {
        $this->conn->close();
    }
}

// Clase CSVImporter
class CSVImporter {
    private $db;

    public function __construct(DatabaseManager $db) {
        $this->db = $db;
    }

    public function importPilotos($csvFile) {
        $handle = fopen($csvFile, "r");
        if (!$handle) {
            return "No se puede abrir el fichero CSV.";
        }

        $header = fgetcsv($handle);
        if (!$header) {
            return "El fichero CSV está vacío o no tiene cabeceras.";
        }

        $sql = "INSERT INTO piloto (nombre, apellido, nacionalidad, fecha_nacimiento) VALUES (?,?,?,?)";
        $stmt = $this->db->prepare($sql);

        while (($data = fgetcsv($handle)) !== false) {
            $stmt->bind_param("ssss", $data[0], $data[1], $data[2], $data[3]);
            $stmt->execute();
        }

        fclose($handle);
        return "Importación completada.";
    }
}

// Clase CSVExporter
class CSVExporter {
    private $db;

    public function __construct(DatabaseManager $db) {
        $this->db = $db;
    }

    public function exportPilotos() {
        $result = $this->db->query("SELECT nombre, apellido, nacionalidad, fecha_nacimiento FROM piloto");

        if (!$result || $result->num_rows === 0) {
            return "No hay datos para exportar.";
        }

        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename=pilotos.csv');
        $output = fopen('php://output', 'w');

        fputcsv($output, array('nombre', 'apellido', 'nacionalidad', 'fecha_nacimiento'));

        while ($row = $result->fetch_assoc()) {
            fputcsv($output, $row);
        }

        fclose($output);
        exit;
    }
}

// Clase Piloto
class Piloto {
    public $id_piloto;
    public $nombre;
    public $apellido;
    public $nacionalidad;
    public $fecha_nacimiento;

    public function __construct($nombre, $apellido, $nacionalidad, $fecha_nacimiento) {
        $this->nombre = $nombre;
        $this->apellido = $apellido;
        $this->nacionalidad = $nacionalidad;
        $this->fecha_nacimiento = $fecha_nacimiento;
    }
}
?>

<!DOCTYPE HTML>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="author" content="Nestor Fernandez Garcia" />
    <meta name="description" content="Viajes F1" />
    <meta name="keywords" content="viajes" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Viajes</title>
 
	<link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
	<link rel="stylesheet" type="text/css" href="estilo/layout.css" />
	<link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v2.11.0/mapbox-gl.css" />
	<link rel="icon" href="multimedia/imagenes/favicon.ico" />

	<script src="js/viajes.js"></script>
	<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha384-1H217gwSVyLSIfaLxHbE7dRb3v4mYCKbpQvzx0cegeju1MVsGrX5xXxAvs/HgeFs" crossorigin="anonymous"></script>
	<script src="https://api.mapbox.com/mapbox-gl-js/v3.7.0/mapbox-gl.js"></script> 

</head>

<body>
    <header>
        <h1><a href="index.html"> F1 DESKTOP</a></h1>
        <nav>
            <a title="Enlace a Inicio" href="index.html"> Inicio</a>
            <a title="Enlace a piloto" href="piloto.html">Piloto</a>
            <a title="Enlace a noticias" href="noticias.html">Noticias</a>
            <a title="Enlace a calendario" href="calendario.html">Calendario</a>
            <a href="viajes.php" class="active">Viajes</a>
            <a title="Enlace a juegos" href="juegos.html">Juegos</a>
            <a title="Enlace a circuito" href="circuito.html">Circuito</a>
            <a title="Enlace a meteorologia" href="meteorologia.html">Meteorologia</a>
        </nav>
    </header>

