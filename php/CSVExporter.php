<?php
require_once "DatabaseManager.php";

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

        // Cabecera
        fputcsv($output, array('nombre', 'apellido', 'nacionalidad', 'fecha_nacimiento'));

        while ($row = $result->fetch_assoc()) {
            fputcsv($output, $row);
        }

        fclose($output);
        exit; // Para asegurar que no se siga procesando HTML
    }

    // Métodos similares para exportar otros datos, por ejemplo exportarResultados($id_temporada)
}
