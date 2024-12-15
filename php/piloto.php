<?php
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
