const eventos = datosAmazing.eventos; 

console.log(location.search)
var id = location.search.split("?id=").filter(Number)

console.log(id)

var selectId= id[0]

var eventoDetalle = []

for(var i = 0; i < eventos.length;i++){
    if(eventos[i].id == selectId){
        eventoDetalle.push(eventos[i])
    }
}
console.log(eventos)
console.log(eventoDetalle)

var card = document.getElementById("detalle")

// Ternario
var asis_esti = eventoDetalle[0].assistance?"Asistencia" : "Estimación"
// console.log(evento[0].assistance?true:false)

// Template String Html junto con Js
card.innerHTML = `
<div class="contenedor">
<div class="conteUno" style = "background-image: url('../Img/${eventoDetalle[0].image}')">
    
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
