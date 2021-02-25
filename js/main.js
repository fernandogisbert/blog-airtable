

const url = "https://api.airtable.com/v0/appvy3MQf9hdLFr56/articulos?view=Grid%20view";
const urlAnyadir = "https://api.airtable.com/v0/appvy3MQf9hdLFr56/articulos";
const authorization = "Bearer keyswzmG8Q7KZoVp0"


var app = new Vue({
    el: '#app',
    data: {

        blog: [],
        nuevoTitulo : '',
        nuevoContenido : '',
        crearEntrada: false

    },
    mounted: function(){
        this.obtenerArticulos();

    },
    methods: {

        obtenerArticulos: function(){

            fetch(url, {
                headers: {
                    'Authorization': authorization
                }
            })
                .then(function(response) {
                    // Transforma la respuesta. En este caso lo convierte a JSON
                    return response.json();
                })
                .then((json)=> {
                    // Usamos la información recibida como necesitemos
                    console.log(json.records);
                    this.blog = json.records;
                });

        },
        anyadirArticulo: function(){
            fetch(urlAnyadir, {
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': authorization
                },
                method: 'POST',
                body: JSON.stringify({
                    "records": [
                        {
                          "fields": {
                            "titulo": this.nuevoTitulo,
                            "contenido": this.nuevoContenido
                          }
                        }]
                })
            })
            .then(()=> this.nuevoTitulo = '')
            .then(()=> this.nuevoContenido = '')
            .then(()=> this.obtenerArticulos())

        },
        mostrarEditor: function(){
            this.crearEntrada = !this.crearEntrada
        }
    }

})
