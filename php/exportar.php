<?php
require_once "classes/DatabaseManager.php";
require_once "classes/CSVExporter.php";

// Ajustar credenciales
$host = "localhost";
$user = "DBUSER2024";
$pass = "DBPSWD2024";
$dbname = "f1db";

$db = new DatabaseManager($host, $user, $pass, $dbname);
$db->connect();


$exporter = new CSVExporter($db);
$exporter->exportPilotos();

