class Noticias {
    constructor() {
          // Comprobar si el navegador soporta la API File
          if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            alert("Lo siento, tu navegador no soporta la API File necesaria para este ejercicio.");
            return; // Salir del constructor si no hay soporte
        }
        // Crear y añadir input para carga de archivo
        const main = document.querySelector("main");
        const seccionCarga = document.createElement("section");
        
        const tituloCarga = document.createElement("h2");
        tituloCarga.textContent = "Cargar archivo de noticias";
        
        const fileInput = document.createElement("input");
        fileInput.setAttribute("type", "file");
        fileInput.setAttribute("aria-label", "Cargar archivo de noticias");
        fileInput.addEventListener("change", (event) => this.readInputFile(event));
        
        seccionCarga.appendChild(tituloCarga);
        seccionCarga.appendChild(fileInput);
        main.appendChild(seccionCarga);

        // Crear sección para mostrar información de archivo y contenido
        this.createDisplaySection();
    }

    createDisplaySection() {
        const main = document.querySelector("main");
        
        // Sección de información del archivo
        const seccionInfo = document.createElement("section");
        const tituloInfo = document.createElement("h2");
        tituloInfo.textContent = "Información del archivo";
        seccionInfo.appendChild(tituloInfo);

        this.nombreArchivo = document.createElement("p");
        this.tamañoArchivo = document.createElement("p");
        this.tipoArchivo = document.createElement("p");
        this.ultimaModificacion = document.createElement("p");

        seccionInfo.append(this.nombreArchivo, this.tamañoArchivo, this.tipoArchivo, this.ultimaModificacion);
        main.appendChild(seccionInfo);

        // Sección de contenido del archivo
        const seccionContenido = document.createElement("section");
        const tituloContenido = document.createElement("h2");
        tituloContenido.textContent = "Contenido del archivo de texto";
        seccionContenido.appendChild(tituloContenido);

        this.areaVisualizacion = document.createElement("pre");
        this.areaVisualizacion.setAttribute("aria-label", "Área de visualización del contenido");
        
        this.errorArchivo = document.createElement("p");
        this.errorArchivo.style.color = "red"; // Mensaje de error en rojo
        
        seccionContenido.append(this.areaVisualizacion, this.errorArchivo);
        main.appendChild(seccionContenido);
    }

    readInputFile(event) {
        const archivo = event.target.files[0];
        if (!archivo) return;

        this.nombreArchivo.innerText = `Nombre del archivo: ${archivo.name}`;
        this.tamañoArchivo.innerText = `Tamaño del archivo: ${archivo.size} bytes`;
        this.tipoArchivo.innerText = `Tipo del archivo: ${archivo.type}`;
        this.ultimaModificacion.innerText = `Fecha de la última modificación: ${archivo.lastModifiedDate}`;

        const tipoTexto = /text.*/;

        if (archivo.type.match(tipoTexto)) {
            const lector = new FileReader();
            lector.onload = (evento) => {
                this.areaVisualizacion.innerText = evento.target.result;
                this.errorArchivo.innerText = ""; // Limpia cualquier error anterior
            };
            lector.readAsText(archivo);
        } else {
            this.errorArchivo.innerText = "Error: ¡¡¡ Archivo no válido !!!";
            this.areaVisualizacion.innerText = "";
        }
    }
}

// Instancia de la clase Noticias
document.addEventListener("DOMContentLoaded", () => {
    new Noticias();
});
