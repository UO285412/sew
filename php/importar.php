<?php
require_once "classes/DatabaseManager.php";
require_once "classes/CSVImporter.php";

// Ajustar credenciales
$host = "localhost";
$user = "DBUSER2024";
$pass = "DBPSWD2024";
$dbname = "f1db";

$db = new DatabaseManager($host, $user, $pass, $dbname);
$db->connect();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['csv_file'])) {
    $fileName = $_FILES['csv_file']['tmp_name'];
    $importer = new CSVImporter($db);

    // Aquí podemos seleccionar qué importar según un parámetro:
    // Ej: if($_POST['tipo'] == 'pilotos') { ... }
    $mensaje = $importer->importPilotos($fileName);
    echo $mensaje;
} else {
    ?>
    <form method="post" enctype="multipart/form-data">
        <label>Seleccione fichero CSV de pilotos:</label><br>
        <input type="file" name="csv_file" accept=".csv"><br>
        <input type="submit" value="Importar">
    </form>
    <?php
}
