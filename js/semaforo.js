class Semaforo {
    constructor() {
        this.lights = document.querySelectorAll('.luz');
        this.startButton = document.getElementById('startButton');
        this.reactionButton = document.getElementById('reactionButton');
        this.reactionTimeDisplay = document.getElementById('reactionTime');
        this.levels = [0.2, 0.5, 0.8];
        this.unload_moment = null;
        this.clic_moment = null;
        this.difficulty = this.levels[Math.floor(Math.random() * this.levels.length)];

        this.startButton.addEventListener('click', () => this.initSequence());
        this.reactionButton.addEventListener('click', () => this.stopReaction());
    }

    initSequence() {
        this.startButton.disabled = true;
        let delay = 500; // Tiempo de delay entre cada luz (0.5s)
        this.lights.forEach((light, index) => {
            setTimeout(() => {
                light.style.backgroundColor = 'red';
                if (index === this.lights.length - 1) {
                    setTimeout(() => {
                        this.unload_moment = new Date();
                        this.endSequence();
                    }, this.difficulty * 1000);
                }
            }, delay * (index + 1));
        });
    }

    endSequence() {
        this.lights.forEach(light => {
            light.style.backgroundColor = '#0007'; // Apagar las luces
        });
        this.reactionButton.disabled = false;
    }

    stopReaction() {
        this.clic_moment = new Date();
        let reactionTime = (this.clic_moment - this.unload_moment) / 1000;
        this.reactionTimeDisplay.textContent = `Tiempo de reacción: ${reactionTime.toFixed(3)} s`;

        // Restablecer el estado de los botones
        this.reactionButton.disabled = true;
        this.startButton.disabled = false;
    }
}

// Inicializar el juego
document.addEventListener('DOMContentLoaded', () => {
    new Semaforo();
});
