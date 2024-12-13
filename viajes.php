<?php
class Carrusel {
    private $capital;
    private $pais;
    protected static $numeroFotosMaximo = 10;
    private $apiKey = "f3a69d2c5dc8783a4194ba3ffd9b167d";
    private $endpoint = "https://www.flickr.com/services/rest/";

    public function __construct($capital, $pais) {
        $this->capital = $capital;
        $this->pais = $pais;
    }

    public function cargarFotosCarrusel() {
        $tags = $this->capital; 

        $urlFlickr = 'https://api.flickr.com/services/feeds/photos_public.gne?'
        . 'tags=' . $this -> pais
        . '&per_page=' . self::$numeroFotosMaximo
        . '&format=json'
        . '&nojsoncallback=1';

    $respuestaJson = json_decode(file_get_contents($urlFlickr));

    if ($respuestaJson) {
        for ($indice = 0; $indice < self::$numeroFotosMaximo; $indice++) {
            $imagenHtml = "<img src=\"";

            $fotoActual = $respuestaJson->items[$indice];
            $urlImagen = $fotoActual->media->m;

            $imagenHtml .= $urlImagen . "\" alt=\"Imagen " . ($indice + 1) . " del carrusel\" />";

            echo $imagenHtml;
        }
    } else {
        echo "<p>Error al obtener las fotos para el carrusel</p>";
    }

}
}
class Moneda {
    private $monedaLocal;
    private $monedaCambio;

    public function __construct($monedaLocal, $monedaCambio) {
        $this->monedaLocal = strtoupper($monedaLocal);
        $this->monedaCambio = strtoupper($monedaCambio);
    }

    public function obtenerCambio() {
        $url = "https://api.exchangerate-api.com/v4/latest/{$this->monedaCambio}";
        $json = @file_get_contents($url); 
    
        if ($json === false) {
            return "Error: No se pudo conectar con el servicio de cambio de moneda.";
        }
    
        $datos = json_decode($json, true);
    
        if (!isset($datos['rates'][$this->monedaLocal])) {
            return "No se pudo obtener el cambio para la moneda solicitada.";
        }
    
        return $datos['rates'][$this->monedaLocal];
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

    <p>Estás en: Inicio | Viajes</p>

    <main>
    <h2>Viajes para ir a la carrera</h2>
    <p></p> 
    
    <article>
        <h3>Carrusel</h3>
        <?php 
            $carrusel = new Carrusel("Shanghai","China");
            $carrusel->cargarFotosCarrusel();
        ?>
        <button> &gt; </button>
        <button> &lt; </button>
    </article>

  
        <!-- Tipo de Cambio -->
        <article>
            <h3>Tipo de Cambio</h3>
            <?php
            $moneda = new Moneda("CNY", "EUR"); // Cambio de Euro a Yuan chino
            $cambio = $moneda->obtenerCambio();
            echo "<p>1 Euro equivale a <strong>$cambio CNY</strong>.</p>";
            ?>
        </article>
    
        <input type="button" value="Obtener mapa estático y dinamico" />
        <article>
            <h3>Mapa Estático</h3>
            <p></p>
            <div></div>
        </article>
        <article>
            <h3>Mapa Dinámico</h3>
            <div></div>
        </article>
    
    <script>
        var viajes = new Viajes();
        viajes.inicializarCarrusel();

    </script>
    
</main>
</body>
</html>