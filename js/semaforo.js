class Semaforo {
    constructor() {
        this.levels = [0.2, 0.5, 0.8]; // Dificultades del juego
        this.lights = 4; // Número de luces del semáforo
        this.unloadMoment = null; // Momento de inicio de la secuencia de apagado
        this.clickMoment = null; // Momento en el que el usuario pulsa el botón de reacción
        this.difficulty = this.levels[Math.floor(Math.random() * this.levels.length)]; // Dificultad aleatoria
        this.createStructure(); // Genera la estructura del semáforo al instanciar
    }

    createStructure() {
        const main = document.querySelector("main");
        const section = document.createElement("section");

        // Encabezado
        const header = document.createElement("h2");
        header.textContent = "Semáforo";
        section.appendChild(header);

        // Crear luces
        for (let i = 0; i < this.lights; i++) {
            const light = document.createElement("div");
            section.appendChild(light);
        }

        // Botón de arranque
        const startButton = document.createElement("button");
        startButton.textContent = "Arranque";
        startButton.type = "button";
        startButton.onclick = this.initSequence.bind(this);
        section.appendChild(startButton);

        // Botón de reacción
        const reactionButton = document.createElement("button");
        reactionButton.textContent = "Reacción";
        reactionButton.type = "button";
        reactionButton.disabled = true;
        reactionButton.onclick = this.stopReaction.bind(this);
        section.appendChild(reactionButton);

        main.appendChild(section);
    }

    arrancar() {
        const main = document.querySelector("main");
        main.classList.add("load"); // Añade la clase para encender las luces

        // Deshabilita el botón de arranque
        document.querySelector("button:nth-of-type(1)").disabled = true;

        // Inicia la secuencia de apagado después de un tiempo calculado
        setTimeout(() => {
            this.unloadMoment = new Date().getTime();
            this.parar();
        }, this.difficulty * 100 + 1500); // Duración total del encendido + tiempo aleatorio
    }

    parar() {
        const main = document.querySelector("main");
        main.classList.remove("load"); // Quita la clase de encendido
        main.classList.add("unload"); // Añade la clase para apagar las luces

        // Habilita el botón de reacción
        document.querySelector("button:nth-of-type(2)").disabled = false;
    }

    stopReaction() {
        this.clickMoment = new Date().getTime();
        const reactionTime = ((this.clickMoment - this.unloadMoment) / 1000).toFixed(3); // Tiempo de reacción en segundos

        // Crear y mostrar el párrafo con el tiempo de reacción
        const paragraph = document.createElement("p");
        paragraph.textContent = `Tiempo de reacción: ${reactionTime} segundos`;
        document.querySelector("section").appendChild(paragraph);

        // Quita las clases de encendido y apagado
        const main = document.querySelector("main");
        main.classList.remove("load");
        main.classList.remove("unload");

        // Habilita el botón de arranque y deshabilita el de reacción
        document.querySelector("button:nth-of-type(1)").disabled = false;
        document.querySelector("button:nth-of-type(2)").disabled = true;
    }
}

// Instancia el semáforo
document.addEventListener("DOMContentLoaded", () => {
    new Semaforo();
});
