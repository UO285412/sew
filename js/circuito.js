/* Tu nombre y datos */
/* Nestor Fernandez Garcia UO285412 */

"use strict";

class Circuito {
    constructor() {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            // El navegador soporta la API File de HTML5
        } else {
            document.body.insertAdjacentHTML('beforeend', "<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");
            this.deshabilitarCargaDeFichero();
        }
    }

    deshabilitarCargaDeFichero() {
        this.deshabilitarCargaDeFicheroXML();
        this.deshabilitarCargaDeFicheroKML();
        this.deshabilitarCargaDeFicheroSVG();
    }

    deshabilitarCargaDeFicheroXML() {
        const xmlInput = document.querySelector("section:nth-of-type(1) input[type='file']");
        if (xmlInput) {
            xmlInput.disabled = true;
        }
    }

    deshabilitarCargaDeFicheroKML() {
        const kmlInput = document.querySelector("section:nth-of-type(2) input[type='file']");
        if (kmlInput) {
            kmlInput.disabled = true;
        }
    }

    deshabilitarCargaDeFicheroSVG() {
        const svgInput = document.querySelector("section:nth-of-type(3) input[type='file']");
        if (svgInput) {
            svgInput.disabled = true;
        }
    }

    // Tarea 6: Procesado de un fichero en formato XML con el API File
    cargarXML() {
        const fileInput = document.querySelector("section:nth-of-type(1) input[type='file']");
        const file = fileInput.files[0];
    
        if (!file) return;
    
        const xmlType = "text/xml";
    
        if (file.type.match(xmlType) || file.name.endsWith('.xml')) {
            this.deshabilitarCargaDeFicheroXML();
            this.procesarXML(file);
        } else {
            this.mostrarError("Error: ¡¡¡ Archivo no válido, debe ser un XML !!!");
        }
    }
    
    
    procesarXML(archivo) {
        const lector = new FileReader();
    
        lector.onload = () => {
            const xmlContent = lector.result;
            this.crearCamposXML(archivo, xmlContent);
        };
    
        lector.onerror = () => {
            this.mostrarError("Error al leer el archivo XML.");
        };
    
        lector.readAsText(archivo);
    }
    

    crearCamposXML(archivo, xmlContent) {
        const seccion = document.querySelector("section:nth-of-type(1)");
    
        // Mostrar información del archivo
        const infoArchivo = document.createElement("div");
        infoArchivo.innerHTML = `
            <p>Nombre del archivo: ${archivo.name}</p>
            <p>Tamaño del archivo: ${archivo.size} bytes</p>
            <p>Tipo del archivo: ${archivo.type}</p>
            <p>Fecha de la última modificación: ${archivo.lastModifiedDate}</p>
            <p>Contenido del archivo XML:</p>
        `;
        seccion.appendChild(infoArchivo);
    
        // Mostrar contenido del XML en un elemento <pre>
        const preElement = document.createElement("pre");
        preElement.textContent = xmlContent;
        seccion.appendChild(preElement);
    }
    

    convertirXMLaHTML(xmlNode) {
        const container = document.createElement("div");

        const nodeName = document.createElement("strong");
        nodeName.textContent = xmlNode.nodeName;
        container.appendChild(nodeName);

        // Agrega los atributos del nodo
        if (xmlNode.attributes) {
            const attributes = Array.from(xmlNode.attributes).map(
                (attr) => `${attr.name}="${attr.value}"`
            );
            if (attributes.length > 0) {
                const attrText = document.createElement("p");
                attrText.textContent = `Atributos: ${attributes.join(", ")}`;
                container.appendChild(attrText);
            }
        }

        // Procesa los nodos hijos
        Array.from(xmlNode.childNodes).forEach((childNode) => {
            if (childNode.nodeType === Node.ELEMENT_NODE) {
                const childHTML = this.convertirXMLaHTML(childNode);
                container.appendChild(childHTML);
            } else if (childNode.nodeType === Node.TEXT_NODE && childNode.nodeValue.trim()) {
                const textNode = document.createElement("p");
                textNode.textContent = `Texto: ${childNode.nodeValue.trim()}`;
                container.appendChild(textNode);
            }
        });

        return container;
    }

    // Tarea 7: Lectura y procesamiento de archivos de planimetría
    cargarKML() {
        const fileInput = document.querySelector("section:nth-of-type(2) input[type='file']");
        const archivo = fileInput.files[0];

        if (!archivo) return;

        if (archivo.name.endsWith('.kml')) {
            this.deshabilitarCargaDeFicheroKML();
            this.procesarKML(archivo);
        } else {
            this.mostrarError("Error: ¡¡¡ Archivo no válido, debe ser un KML !!!");
        }
    }

    procesarKML(archivo) {
        const lector = new FileReader();

        lector.onload = () => {
            const parser = new DOMParser();
            const kmlDoc = parser.parseFromString(lector.result, "application/xml");

            if (kmlDoc.querySelector("parsererror")) {
                this.mostrarError("Error: No se pudo procesar el archivo KML.");
                return;
            }

            this.crearCamposKML(kmlDoc);
        };

        lector.onerror = () => {
            this.mostrarError("Error al leer el archivo KML.");
        };

        lector.readAsText(archivo);
    }

    crearCamposKML(kmlDoc) {
        const seccion = document.querySelector("section:nth-of-type(2)");
    
        // Crear contenedor para el mapa
        const contenedorMapa = document.createElement("div");
        seccion.appendChild(contenedorMapa);
    
        // Inicializar el mapa
        mapboxgl.accessToken = "pk.eyJ1IjoibmVzdG9yMjU0MCIsImEiOiJjbTNmMDhzNWQwanppMmxzYWR4NGhxdTg5In0.3yLmtGrb9H9BRfeqAq0rsQ";
    
        const map = new mapboxgl.Map({
            container: contenedorMapa,
            style: 'mapbox://styles/mapbox/streets-v11',
            zoom: 2
        });
    
        // Procesar y agregar la línea al mapa
        const placemarks = kmlDoc.querySelectorAll("Placemark");
    
        placemarks.forEach((placemark, index) => {
            if (placemark.querySelector("LineString")) {
                const coordinatesText = placemark.querySelector("LineString coordinates").textContent.trim();
                const coordinateLines = coordinatesText.split(/\s+/);
                const coords = [];
    
                coordinateLines.forEach(line => {
                    if (!line) return;
                    const parts = line.split(",");
                    if (parts.length < 2) return;
    
                    const lon = parseFloat(parts[0]);
                    const lat = parseFloat(parts[1]);
    
                    coords.push([lon, lat]);
                });
    
                if (coords.length === 0) {
                    this.mostrarError("No se encontraron puntos válidos en el LineString.");
                    return;
                }
    
                map.on('load', () => {
                    map.addSource(`line-${index}`, {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            geometry: {
                                type: 'LineString',
                                coordinates: coords
                            }
                        }
                    });
    
                    map.addLayer({
                        id: `line-${index}`,
                        type: 'line',
                        source: `line-${index}`,
                        layout: {
                            'line-join': 'round',
                            'line-cap': 'round'
                        },
                        paint: {
                            'line-color': '#FF0000',
                            'line-width': 4
                        }
                    });
    
                    // Ajustar el mapa para mostrar la línea completa
                    const bounds = coords.reduce((bounds, coord) => {
                        return bounds.extend(coord);
                    }, new mapboxgl.LngLatBounds(coords[0], coords[0]));
    
                    map.fitBounds(bounds, { padding: 20 });
                });
            }
        });
    }
    

    // Tarea 8: Lectura y procesamiento de archivos de altimetría
    cargarSVG() {
        const fileInput = document.querySelector("section:nth-of-type(3) input[type='file']");
        const archivo = fileInput.files[0];

        if (!archivo) return;

        if (archivo.name.endsWith('.svg')) {
            this.deshabilitarCargaDeFicheroSVG();
            this.procesarSVG(archivo);
        } else {
            this.mostrarError("Error: ¡¡¡ Archivo no válido, debe ser un SVG !!!");
        }
    }

    procesarSVG(archivo) {
        const lector = new FileReader();

        lector.onload = () => {
            const svgContent = lector.result;
            this.crearCamposSVG(svgContent);
        };

        lector.onerror = () => {
            this.mostrarError("Error al leer el archivo SVG.");
        };

        lector.readAsText(archivo);
    }

    crearCamposSVG(svgContent) {
        const seccion = document.querySelector("section:nth-of-type(3)");

        const contenedorSVG = document.createElement("div");
        contenedorSVG.innerHTML = svgContent;
        seccion.appendChild(contenedorSVG);
    }

    // Método para mostrar errores
    mostrarError(mensaje) {
        const errorPara = document.createElement('p');
        errorPara.textContent = mensaje;
        document.body.appendChild(errorPara);
    }
}

// Instanciar la clase
const circuito = new Circuito();
