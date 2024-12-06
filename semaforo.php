<?php
// Clase Record
class Record {
    // Atributos de la clase
    public $server;
    public $user;
    public $pass;
    public $dbname;
    
    public function __construct() {
        $this->server = "localhost";
        $this->user = "DBUSER2024";
        $this->pass = "DBPSWD2024";
        $this->dbname = "records";
        // Crear conexión a la base de datos
        $this->conn = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
    
        // Verificar conexión
        if ($this->conn->connect_error) {
            die("Conexión fallida: " . $this->conn->connect_error);
        }
    
        echo "Conexión exitosa a la base de datos.";
        // No cierres la conexión aquí con $conn->close(); ya que la necesitarás para las operaciones
    
    

        // Verificar conexión
        if ($this->conn->connect_error) {
            die("Conexión fallida: " . $this->conn->connect_error);
        }
    
        echo "Conexión exitosa a la base de datos.";
        $conn->close();
        }
       
    public function saveRecord($nombre, $apellidos, $nivel, $tiempo) {
        $stmt = $this->conn->prepare("INSERT INTO registro (nombre, apellidos, nivel, tiempo) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $nombre, $apellidos, $nivel, $tiempo);

        if ($stmt->execute()) {
            echo "<p>Récord guardado correctamente.</p>";
        } else {
            echo "<p>Error al guardar el récord: " . $stmt->error . "</p>";
        }

        $stmt->close();
    }

    public function getTopRecords($nivel) {
        $stmt = $this->conn->prepare("SELECT nombre, apellidos, tiempo FROM registro WHERE nivel = ? ORDER BY tiempo ASC LIMIT 10");
        $stmt->bind_param("s", $nivel);

        $stmt->execute();
        $result = $stmt->get_result();

        $records = [];
        while ($row = $result->fetch_assoc()) {
            $records[] = $row;
        }

        $stmt->close();
        return $records;
    }
    
}
// Comprobar si se ha enviado el formulario de récord
$record = new Record();
$recordsMostrados = false;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Datos enviados desde el formulario de récord
    $nombre = $_POST['nombre'] ?? '';
    $apellidos = $_POST['apellidos'] ?? '';
    $nivel = $_POST['nivel'] ?? '';
    $tiempo = isset($_POST['tiempo']) ? floatval($_POST['tiempo']) : 0.0;

    // Guardar el récord
    $record->saveRecord($nombre, $apellidos, $nivel, $tiempo);

    // Obtener los 10 mejores récords para el nivel actual
    $topRecords = $record->getTopRecords($nivel);
    $recordsMostrados = true;
}
?>



<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Juego del Semáforo</title>
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="stylesheet" href="estilo/semaforo_grid.css" />
    <link rel="icon" href="multimedia/imagenes/favicon.ico" />
</head>
<body>
    <header>
        <h1><a href="index.html">F1 DESKTOP</a></h1>
        <nav>
            <a title="Enlace a Inicio" href="index.html">Inicio</a>
            <a title="Enlace a piloto" href="piloto.html">Piloto</a>
            <a title="Enlace a noticias" href="noticias.html">Noticias</a>
            <a title="Enlace a calendario" href="calendario.html">Calendario</a>
            <a title="Enlace a viajes" href="viajes.php">Viajes</a>
            <a title="Enlace a juegos" href="juegos.html">Juegos</a>
            <a title="Enlace a circuito" href="circuito.html">Circuito</a>
            <a title="Enlace a meteorologia" href="meteorologia.html">Meteorología</a>
        </nav>
    </header>
    <p>Estás en: Inicio >> Juegos >> Juego del Semáforo</p>
    
    <main>
    <?php
    // Si se han mostrado records
    if ($recordsMostrados) {
        echo "<section>";
        echo "<h2>Top 10 Récords - Nivel {$_POST['nivel']}</h2>";
        echo "<ol>";
        foreach ($topRecords as $r) {
            echo "<li>{$r['nombre']} {$r['apellidos']} - {$r['tiempo']} segundos</li>";
        }
        echo "</ol>";
        echo "</section>";
    }
    ?>
    </main>
    <script src="js/semaforo.js"></script>
    <script>
    document.addEventListener('DOMContentLoaded', () => {
        window.semaforo = new Semaforo();
    });
    </script>
</body>
</html>