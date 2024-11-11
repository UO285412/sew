class Noticias {
    constructor() {
        const fileInput = document.getElementById("fileInput");
        fileInput.addEventListener("change", (event) => this.readInputFile(event));
    }

    readInputFile(event) {
        const archivo = event.target.files[0];
        if (!archivo) return;

        const nombre = document.getElementById("nombreArchivo");
        const tamaño = document.getElementById("tamañoArchivo");
        const tipo = document.getElementById("tipoArchivo");
        const ultima = document.getElementById("ultimaModificacion");
        const contenido = document.getElementById("contenidoArchivo");
        const areaVisualizacion = document.getElementById("areaTexto");
        const errorArchivo = document.getElementById("errorLectura");

        nombre.innerText = "Nombre del archivo: " + archivo.name;
        tamaño.innerText = "Tamaño del archivo: " + archivo.size + " bytes";
        tipo.innerText = "Tipo del archivo: " + archivo.type;
        ultima.innerText = "Fecha de la última modificación: " + archivo.lastModifiedDate;

        contenido.innerText = "Contenido del archivo de texto:";
        const tipoTexto = /text.*/;

        if (archivo.type.match(tipoTexto)) {
            const lector = new FileReader();
            lector.onload = function (evento) {
                areaVisualizacion.innerText = evento.target.result;
            };
            lector.readAsText(archivo);
        } else {
            errorArchivo.innerText = "Error: ¡¡¡ Archivo no válido !!!";
        }
    }
}

// Instancia de la clase Noticias
new Noticias();
