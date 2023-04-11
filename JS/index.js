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
var buttonNavegacion = []

var buttonNav = document.getElementsByClassName("navLink") //Capturo todos los elementos cuya clase es NAVLINK  document.getElementsByClassName. aca quedan todos los botones guardados
for (var i = 0; i < buttonNav.length; i++) { //Recorro todos los elementos con un for que tienen la clase NAVLINK y a medida que los recorre le agraga un escuchador de eventos 
    const element = buttonNav[i]
    buttonNavegacion.push(buttonNav[i].innerText)
    //Escuchador de eventos escucha el click
    element.addEventListener("click", function (e) { //Cuando le doy click a los botones por la funcion le pido que me traiga los atributos o propiedades del boton en este caso extraigo el ID
        document.getElementById("name").innerHTML = e.target.innerText
        imprimir(e.target.id)
    })
}
console.log(buttonNavegacion)

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





//     var buttonBarraNavIzq = document.getElementsByClassName("fa-chevron-left") //Capturo todos los elementos cuya clase es NAVLINK  document.getElementsByClassName. aca quedan todos los botones guardados
//     for (var i = 0; i < buttonBarraNavIzq.length; i++) { //Recorro todos los elementos con un for que tienen la clase NAVLINK y a medida que los recorre le agraga un escuchador de eventos 
//         const element = buttonBarraNavIzq[i]
//         //Escuchador de eventos escucha el click
//         element.addEventListener("click", function (e) { //Cuando le doy click a los botones por la funcion le pido que me traiga los atributos o propiedades del boton en este caso extraigo el ID
//             imprimir(e.target.id)
//         })
//     }

//     var nombre= document.getElementsByClassName("nombrePages")
//     console.log(nombre[0])

// console.log(buttonNav[0])

var buttonDer = document.getElementById("butDer")
buttonDer.addEventListener("click", function (e) {
    var page = document.getElementById("name").innerText
    if(buttonNavegacion.indexOf(page) < 4 ){
        changePage(buttonNavegacion.indexOf(page) + 1)
        
    }else{
        changePage(0)
    }
    
})

function changePage(i) {
    switch (i) {
        case 0: display(eventos)
        document.getElementById("name").innerHTML = buttonNavegacion[i]
            break;
        case 1: display(eventosFuturos)
        document.getElementById("name").innerHTML = buttonNavegacion[i]
            break;
        case 2: display(eventosPasados)
        document.getElementById("name").innerHTML = buttonNavegacion[i]
            break;
        case 3 : imprimirFormulario()
        document.getElementById("name").innerHTML = buttonNavegacion[i]
        break;
        default: imprimirStats()
        document.getElementById("name").innerHTML = buttonNavegacion[i]


    }
}

function imprimirFormulario(){
    document.getElementById("todosLosEventos").innerHTML = `
    <div class="formulario">
            <div class="row">
                <form class="col s12">
                    <div class="row">
                        <div class="input-field col s6">
                            <i class="material-icons prefix">account_circle</i>
                            <input id="icon_prefix" type="text" class="validate">
                            <label for="icon_prefix">Nombre y Apeliido</label>
                        </div>
                        <div class="input-field col s6">
                            <i class="material-icons prefix">phone</i>
                            <input id="icon_telephone" type="tel" class="validate">
                            <label for="icon_telephone">Telefono</label>
                        </div>
                        <div class="input-field col s6">
                            <i class="material-icons prefix">email</i>
                            <input id="icon_prefix" type="text" class="validate">
                            <label for="icon_prefix">Correo Electronico</label>
                        </div>
                        <button class="btn waves-effect waves-light" type="submit" name="action">Enviar
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `
}

function imprimirStats(){
    document.getElementById("todosLosEventos").innerHTML = `
    <h1> Aqui va el contenido</h1>
    `
}