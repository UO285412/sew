<?php
// Clase Record
class Conexion {
// Atributos de la clase
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

        // Crear conexión a la base de datos
        $this->conn = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

        // Verificar conexión
        if ($this->conn->connect_error) {
            die("Conexión fallida: " . $this->conn->connect_error);
        }

        // Puedes comentar o eliminar este echo para evitar mostrar mensajes en producción
        // echo "Conexión exitosa a la base de datos.";
    }
}