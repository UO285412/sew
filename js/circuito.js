document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.querySelector("input[type='file']");
    const output = document.querySelector("main > section > article");

    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];

        if (!file) return;

        // Verifica que sea un archivo XML
        if (file.type !== "text/xml" && !file.name.endsWith(".xml")) {
            output.innerHTML = "<p>Error: El archivo seleccionado no es un XML válido.</p>";
            return;
        }

        const reader = new FileReader();

        reader.onload = function (e) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(e.target.result, "application/xml");

            if (xmlDoc.querySelector("parsererror")) {
                output.innerHTML = "<p>Error: No se pudo procesar el archivo XML.</p>";
                return;
            }

            displayXML(xmlDoc, output);
        };

        reader.onerror = function () {
            output.innerHTML = "<p>Error al leer el archivo.</p>";
        };

        reader.readAsText(file);
    });

    // Función para mostrar el contenido del XML en HTML
    function displayXML(xmlDoc, container) {
        container.innerHTML = ""; // Limpia el contenido previo

        const root = xmlDoc.documentElement; // Nodo raíz del XML

        // Convierte el XML en HTML
        const htmlContent = convertXMLToHTML(root);
        container.appendChild(htmlContent);
    }

    // Función recursiva para convertir nodos XML a nodos HTML
    function convertXMLToHTML(xmlNode) {
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
                const childHTML = convertXMLToHTML(childNode);
                container.appendChild(childHTML);
            } else if (childNode.nodeType === Node.TEXT_NODE && childNode.nodeValue.trim()) {
                const textNode = document.createElement("p");
                textNode.textContent = `Texto: ${childNode.nodeValue.trim()}`;
                container.appendChild(textNode);
            }
        });

        return container;
    }
});
