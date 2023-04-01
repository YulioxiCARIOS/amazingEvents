//Aca se separa la información del archivo JSON
const fechaBase = datosAmazing.fechaActual;
const eventos = datosAmazing.eventos;
var eventosPasados = [];
var eventosFuturos = [];

for (var i = 0; i < eventos.length; i++) {// con este for recorro todos los eventos de amazing y los que son menores a la fecha base se guardan en el array eventos pasados, si es mayor se guardan en el array de eventos futuros

    if (eventos[i].date > fechaBase) {
        eventosFuturos.push(eventos[i])
    } else {
        eventosPasados.push(eventos[i])
    }
}

console.log("Fecha base del Amazing Events : " + fechaBase)
console.log(eventos)
console.log(eventosPasados)
console.log(eventosFuturos)

var buttonNav = document.getElementsByClassName("navLink") //Capturo todos los elementos cuya clase es NAVLINK  document.getElementsByClassName. aca quedan todos los botones guardados
for (var i = 0; i < buttonNav.length; i++) { //Recorro todos los elementos con un for que tienen la clase NAVLINK y a medida que los recorre le agraga un escuchador de eventos 
    const element = buttonNav[i]
    //Escuchador de eventos escucha el click
    element.addEventListener("click", function (e) { //Cuando le doy click a los botones por la funcion le pido que me traiga los atributos o propiedades del boton en este caso extraigo el ID
        imprimir(e.target.id)
    })
}

function imprimir(id) {
    // console.log(id)
    switch (id) {
        case "Upcoming":
            display(eventosFuturos)
            break;
        case "Past":
            display(eventosPasados)
            break;
        default:
            display(eventos)
    }
}

function display(array) {
    var html = "";
    for (var i = 0; i < array.length; i++) {
        html += `    
        <div class="uno">
            <div class="cards">
                <div class="cardUno">
                   <img class="img imagenUno" src="../Amazing JS/Img/${array[i].image}" alt="" srcset="">
                    <div class="title">${array[i].name}</div>
                    <div class="descrip">${array[i].description} </div>
                    <div class="price">
                        <div class="price-ver">Price :${array[i].price}</div>
                        <div class="verMas" ><button class="but"><a href="./pages/detalle.html?id=${array[i].id}">Ver Mas.</a>
                            </button></div>
                    </div>
                </div>
            </div>
        `
    }

    document.getElementById("todosLosEventos").innerHTML = html;
}

console.log(location.search)
var time = location.search.split("?time=");

console.log(time[1])


    switch (time[1]) {
        case "Past":
            imprimir("Past")
            break;
        case "Upcoming":
            imprimir("Upcoming")
            break;
        default:
            imprimir("Home")
    }



