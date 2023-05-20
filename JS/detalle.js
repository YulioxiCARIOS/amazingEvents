//  -------------------ME TRAIGO DATA DE LA API--------------------
async function getData() {
    let datosApi
    await fetch("https://amd-amazingevents-api.onrender.com/api/eventos")
        .then(response => response.json())
        .then(json => datosApi = json)

    eventos = datosApi.eventos
    fechaBase = datosApi.fechaActual

    detalles()
}
getData()

function detalles(){
var id = location.search.split("?id=").filter(Number)
var selectId= id[0]
var eventoDetalle = []

for(var i = 0; i < eventos.length;i++){
    if(eventos[i].id == selectId){
        eventoDetalle.push(eventos[i])
    }
}

var card = document.getElementById("detalle")

// Ternario
var asis_esti = eventoDetalle[0].assistance?"Asistencia" : "Estimación"

card.innerHTML = `
<div class="contenedor">
<img class="conteUno" src="${eventoDetalle[0].image}" alt="" srcset="">

    
</div>
<div class="conteDos">
    <div class="titulo">
        <h3> ${eventoDetalle[0].name}</h3>
    </div>
    <div class="descrip">
        <p> ${eventoDetalle[0].description}</p>
        <p><i class="fa-solid fa-location-dot"></i>Lugar: ${eventoDetalle[0].place}</p>
        <p><i class="fa-solid fa-calendar-days"></i>Fecha: ${eventoDetalle[0].date}</p>
        <p><i class="fa-solid fa-person"></i>Capacidad: ${eventoDetalle[0].capacity}</p>
        <p><i class="fa-solid fa-house"></i>${asis_esti}: ${eventoDetalle[0].assistance || eventoDetalle[0].estimate}</p>
        <p><i class="fa-solid fa-check"></i>Categoria: ${eventoDetalle[0].category}</p>
    </div>
</div>

</div>`

}
