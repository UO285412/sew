class Viajes {
    constructor() {
        this.latitude = null;
        this.longitude = null;
        this.errorMessage = null;

        this.initGeolocation();
    }

    initGeolocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                this.storePosition.bind(this),
                this.handleError.bind(this),
                { enableHighAccuracy: true }
            );
        } else {
            this.errorMessage = "Geolocalización no soportada por el navegador.";
            this.displayError();
        }
    }

    storePosition(position) {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.displayPosition();
        this.displayStaticMap();
        this.displayDynamicMap();
    }

    handleError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                this.errorMessage = "Permiso denegado para geolocalización.";
                break;
            case error.POSITION_UNAVAILABLE:
                this.errorMessage = "Información de geolocalización no disponible.";
                break;
            case error.TIMEOUT:
                this.errorMessage = "Tiempo de espera agotado para obtener la ubicación.";
                break;
            case error.UNKNOWN_ERROR:
                this.errorMessage = "Error desconocido en la geolocalización.";
                break;
        }
        this.displayError();
    }

    displayPosition() {
        const locationArticle = document.querySelector("main > section > article:nth-of-type(1)");
        locationArticle.innerHTML = `
            <p>Latitud: ${this.latitude}</p>
            <p>Longitud: ${this.longitude}</p>
        `;
    }

    displayError() {
        const main = document.querySelector("main");
        const errorParagraph = document.createElement("p");
        errorParagraph.textContent = this.errorMessage;
        main.appendChild(errorParagraph);
    }

    displayStaticMap() {
        const mapArticle = document.querySelector("main > section > article:nth-of-type(2)");

        const mapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s+fb0e55(${this.longitude},${this.latitude})/${this.longitude},${this.latitude},16,0/400x500?access_token=pk.eyJ1IjoibmVzdG9yMjU0MCIsImEiOiJjbTNmMDhzNWQwanppMmxzYWR4NGhxdTg5In0.3yLmtGrb9H9BRfeqAq0rsQ`;

        mapArticle.innerHTML = `<img src="${mapUrl}" alt="Mapa estático de Mapbox">`;
    }

    displayDynamicMap() {
        const mapContainer = document.querySelector("main > section > div");

        mapboxgl.accessToken = "pk.eyJ1IjoibmVzdG9yMjU0MCIsImEiOiJjbTNmMDhzNWQwanppMmxzYWR4NGhxdTg5In0.3yLmtGrb9H9BRfeqAq0rsQ";

        const map = new mapboxgl.Map({
            container: mapContainer,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [this.longitude, this.latitude],
            zoom: 14
        });

        new mapboxgl.Marker({color:'red'})
            .setLngLat([this.longitude, this.latitude])
            .addTo(map);
            map.resize();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new Viajes();
});
