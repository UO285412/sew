class Pais {
    constructor(nombrePais, nombreCapital, cantidadPoblacion, apiKey) {
        this.nombrePais = nombrePais;
        this.nombreCapital = nombreCapital;
        this.cantidadPoblacion = cantidadPoblacion;
        this.apiKey = apiKey;
    }

    obtenerPrevisionTiempo() {
        // URL de la API sin coordenadas, usando solo el nombre de la ciudad (Shanghai)
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=Shanghai&lang=es&units=metric&mode=xml&appid=${this.apiKey}`;

        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'xml',
            success: (data) => {
                this.procesarPrevisionTiempo(data);
            },
            error: () => {
                console.log('Error al obtener la previsión del tiempo.');
            }
        });
    }

    procesarPrevisionTiempo(xmlData) {
        console.log(xmlData);
        const $xml = $(xmlData);
        const $prevision = $('main').first();

        // Limpiar contenido previo
        $prevision.empty();

     
        const pronosticos = $xml.find('time[from$="12:00:00"]'); // Selecciona pronósticos del mediodía

        pronosticos.each(function(index) {
            if (index < 5) { // Solo los próximos 5 días
                const $this = $(this);

                // Fecha del pronóstico
                const fecha = $this.attr('from').split('T')[0];

                // Temperaturas
                const tempMax = $this.find('temperature').attr('max');
                const tempMin = $this.find('temperature').attr('min');

                // Humedad
                const humedad = $this.find('humidity').attr('value');

                // Icono del tiempo
                const simboloClima = $this.find('symbol').attr('var');
                const iconUrl = `https://openweathermap.org/img/wn/${simboloClima}@2x.png`;

                // Cantidad de lluvia
                let lluvia = $this.find('precipitation').attr('quantity');
                if (!lluvia) {
                    lluvia = 'No disponible';
                }

              
                const $article = $('<article></article>');
                const $fecha = $('<h2></h2>').text(fecha);
                const $icono = $('<img>').attr('src', iconUrl).attr('alt', 'Icono del clima');

                const $tempMax = $('<p></p>').text(`Temperatura Máxima: ${tempMax} °C`);
                const $tempMin = $('<p></p>').text(`Temperatura Mínima: ${tempMin} °C`);
                const $humedad = $('<p></p>').text(`Humedad: ${humedad}%`);
                const $lluvia = $('<p></p>').text(`Lluvia: ${lluvia}`);

                
                $article.append($fecha, $icono, $tempMax, $tempMin, $humedad, $lluvia);

                
                $prevision.append($article);
            }
        });
    }
}

// Crear una instancia de la clase Pais y obtener la previsión del tiempo para Shanghai
const pais = new Pais("China", "Shanghai", "1.409.000.000", 'd2b34fee546c2de560551f6b17f107ce');
pais.obtenerPrevisionTiempo();
