/* Nestor Fernandez Garcia UO287577 */

class Semaforo {
    constructor() {
        this.levels = [0.2, 0.5, 0.8]; // Dificultades del juego
        this.lights = 4; // Número de luces
        this.unloadMoment = null; // Marca de tiempo para el inicio de la secuencia de apagado
        this.clicMoment = null; // Marca de tiempo para la pulsación del usuario
        this.difficulty = this.levels[Math.floor(Math.random() * this.levels.length)]; // Dificultad aleatoria
        this.inicializarEstructura();
    }

    inicializarEstructura() {
        // Crear la estructura del juego dentro del elemento main
        const main = document.querySelector('main');
        const section = document.createElement('section');

        const titulo = document.createElement('h2');
        titulo.textContent = 'Juego del Semáforo';
        section.appendChild(titulo);

        // Crear las luces del semáforo
        for (let i = 0; i < this.lights; i++) {
            const luz = document.createElement('div');
            section.appendChild(luz);
        }

        // Botón de arranque
        const botonArrancar = document.createElement('button');
        botonArrancar.type = 'button';
        botonArrancar.textContent = 'Arranque';
        botonArrancar.onclick = this.iniciarSecuencia.bind(this);
        section.appendChild(botonArrancar);

        // Botón de reacción
        const botonReaccion = document.createElement('button');
        botonReaccion.type = 'button';
        botonReaccion.textContent = 'Reacción';
        botonReaccion.disabled = true;
        botonReaccion.onclick = this.detenerReaccion.bind(this);
        section.appendChild(botonReaccion);

        main.appendChild(section);
    }

    iniciarSecuencia() {
        const main = document.querySelector('main');
        const botonArranque = document.querySelector('section button:first-of-type');
        const parrafoReaccion = document.querySelector('section p:last-child');

        // Eliminar párrafo de tiempo de reacción previo si existe
        if (parrafoReaccion) {
            parrafoReaccion.remove();
        }

        main.classList.add('load');
        botonArranque.disabled = true;

        setTimeout(() => {
            this.unloadMoment = Date.now();
            this.finalizarSecuencia();
        }, this.difficulty * 100 + 1500);
    }

    finalizarSecuencia() {
        const main = document.querySelector('main');
        const botonReaccion = document.querySelector('section button:nth-of-type(2)');

        main.classList.remove('load');
        main.classList.add('unload');
        botonReaccion.disabled = false;
    }

    detenerReaccion() {
        this.clicMoment = Date.now();
        const tiempoReaccion = ((this.clicMoment - this.unloadMoment) / 1000).toFixed(3);

        const parrafo = document.createElement('p');
        parrafo.textContent = `Tiempo de reacción: ${tiempoReaccion} segundos`;

        const section = document.querySelector('section');
        section.appendChild(parrafo);

        const main = document.querySelector('main');
        main.classList.remove('load');
        main.classList.remove('unload');

        const botonArranque = document.querySelector('section button:first-of-type');
        const botonReaccion = document.querySelector('section button:nth-of-type(2)');
        botonArranque.disabled = false;
        botonReaccion.disabled = true;
    }
}

// Crear una instancia de la clase Semaforo
const semaforo = new Semaforo();
