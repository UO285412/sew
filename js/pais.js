        class Pais {
           
            constructor (nombrePais,nombrecapital,cantidadPoblacion){
                this.nombrePais=nombrePais;
                this.nombrecapital=nombrecapital;    
                this.cantidadPoblacion=cantidadPoblacion;
                this.setDatos();
            }
            getNombrePais(){
               return this.nombrePais;
                
            }
            getNombreCapital(){
                return this.nombrecapital;
                 
             }
            getInformacionSecundaria() {
                return "" +
                "<ul>" +
                    "<li>" +
                        "<h3>Nombre del circuito:</h3>" +
                        "<p>" + this.nombreCircuito + "</p>" +
                    "</li>" +
                    "<li>" +
                        "<h3>Cantidad de población:</h3>" +
                        "<p>" + this.cantidadPoblacion + "</p>" +
                    "</li>" +
                    "<li>" +
                        "<h3>Forma de gobierno:</h3>" +
                        "<p>" + this.formaGobierno + "</p>" +
                    "</li>" +
                    "<li>" +
                        "<h3>Religión mayoritaria:</h3>" +
                        "<p>" + this.religionMayoritaria + "</p>" +
                    "</li>" +
                "</ul>";
            }
            setDatos(){
                this.formaGobierno="República socialista unitaria marxista-leninista de partido hegemónico";
                this.coordenadas="31.337211°N 121.220293°E";
                this.religionMayoritaria="Budismo";
                this.cantidadPoblacion="1.409.000.000";
                this.nombreCircuito="Shanghai";
            }
            writeCoordenadas(){
                document.write("<p>"+"Las coordenadas son "+ this.coordenadas+" </p>");
            }

        }
        var pais= new Pais("China","Shanghai","Shanghai","1.409.670.000");
        pais.setDatos();
        document.write("<h2> Informacion principal </h2>");
        document.write("<h3>Nombre del pais</h3>"+pais.getNombrePais());
        document.write("<h3>Nombe de la capital</h3>" + pais.getNombreCapital());
        document.write("<h2>Informacion secundaria</h2>");
        document.write(pais.getInformacionSecundaria());
        document.write("<h2>Coordenadas de la linea del circuito</h2>")
        pais.writeCoordenadas();


    