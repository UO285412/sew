<?php
require_once "DatabaseManager.php";

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

        // Esperamos cabeceras en la primera línea
        $header = fgetcsv($handle);
        if (!$header) {
            return "El fichero CSV está vacío o no tiene cabeceras.";
        }

        // Asumimos un formato de columnas: nombre, apellido, nacionalidad, fecha_nacimiento
        $sql = "INSERT INTO piloto (nombre, apellido, nacionalidad, fecha_nacimiento) VALUES (?,?,?,?)";
        $stmt = $this->db->prepare($sql);

        while (($data = fgetcsv($handle)) !== false) {
            // Ajustar índices según orden de columnas en CSV
            $stmt->bind_param("ssss", $data[0], $data[1], $data[2], $data[3]);
            $stmt->execute();
        }

        fclose($handle);
        return "Importación completada.";
    }

    // Métodos similares para importar otros tipos de datos (equipos, circuitos, etc.)
}
