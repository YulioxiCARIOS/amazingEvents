let fechaBase
let eventos
let nombreEventos = document.getElementById("todosLosEventos")
let arrayAFiltrar = []
var searchContainer = document.getElementById("searchContainer")
var eventosPasados = [];
var eventosFuturos = [];
let checkedCheckBoxes = [];
let search = ""
let input_Search = document.getElementById("inputSearch")
let estadisticas = document.getElementById("estadisticas")

//  -------------------ME TRAIGO DATA DE LA API--------------------
async function getData() {
    let datosApi
    await fetch("https://amd-amazingevents-api.onrender.com/api/eventos")
        .then(response => response.json())
        .then(json => datosApi = json)

    eventos = datosApi.eventos
    fechaBase = datosApi.fechaActual

    for (var i = 0; i < eventos.length; i++) {// con este for recorro todos los eventos de amazing y los que son menores a la fecha base se guardan en el array eventos pasados, si es mayor se guardan en el array de eventos futuros

        if (eventos[i].date > fechaBase) {
            eventosFuturos.push(eventos[i])
        } else {
            eventosPasados.push(eventos[i])
        }
    }


    page()
}
getData()


var buttonNavegacion = []

var buttonNav = document.getElementsByClassName("navLink") //Capturo todos los elementos cuya clase es NAVLINK  document.getElementsByClassName. aca quedan todos los botones guardados
for (var i = 0; i < buttonNav.length; i++) { //Recorro todos los elementos con un for que tienen la clase NAVLINK y a medida que los recorre le agraga un escuchador de eventos
    const element = buttonNav[i]
    buttonNavegacion.push(buttonNav[i].innerText)
    //Escuchador de eventos escucha el click
    element.addEventListener("click", function (e) { //Cuando le doy click a los botones por la funcion le pido que me traiga los atributos o propiedades del boton en este caso extraigo el ID
        // document.getElementById("name").innerHTML = e.target.innerText
        imprimir(e.target.id)
    })
}

function imprimir(id) {
    switch (id) {
        case "Upcoming":
            document.getElementById("name").innerHTML = "Upcoming Events"
            inputSearch.style.display = "flex"
            console.log(eventosFuturos)
            checkCategories.style.display = "flex"
            todosLosEventos.style.display = "flex"
            estadisticas.style.display = "none"
            formulario.style.display = "none"
            display(eventosFuturos)
            eventsCategories(eventosFuturos)
            arrayAFiltrar = eventosFuturos
            
            break;
        case "Past":
            document.getElementById("name").innerHTML = "Past Events"
            console.log(eventosPasados)
            inputSearch.style.display = "flex"
            checkCategories.style.display = "flex"
            todosLosEventos.style.display = "flex"
            estadisticas.style.display = "none"
            formulario.style.display = "none"
            display(eventosPasados)
            eventsCategories(eventosPasados)
            arrayAFiltrar = eventosPasados
           

            break;
        case "Contact":
            document.getElementById("name").innerHTML = "Contact"
            inputSearch.style.display = "none"
            let form = document.getElementById("formulario")
            form.addEventListener("submit", function (event) { actionForm(event) })
            checkCategories.style.display = "none"
            todosLosEventos.style.display = "none"
            estadisticas.style.display = "none"
            formulario.style.display = "flex"
            imprimirFormulario()
           

            break;
        case "Stats":
            document.getElementById("name").innerHTML = "Stats"
            inicioEstadisticas()
            inputSearch.style.display = "none"
            checkCategories.style.display = "none"
            todosLosEventos.style.display = "none"
            formulario.style.display = "none"
            estadisticas.style.display = "flex"
            imprimirStats()

            break;
        default:
            document.getElementById("name").innerHTML = "Home"
            inputSearch.style.display = "flex"
            checkCategories.style.display = "flex"
            todosLosEventos.style.display = "flex"
            estadisticas.style.display = "none"
            formulario.style.display = "none"
            display(eventos)
            eventsCategories(eventos)
            arrayAFiltrar = eventos

            break;


    }
}

function display(array) {
    var html = "";
    for (var i = 0; i < array.length; i++) {
        html += `
        <div class="uno">
            <div class="cards">
                <div class="cardUno">
                   <img class="img imagenUno" src="${array[i].image}" alt="" srcset="">
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

function page() {
    var time = location.search.split("?time=");
    
    switch (time[1]) {
        case "Past":
            imprimir("Past")
            break;
        case "Upcoming":
            imprimir("Upcoming")
            break;
        case "Contact":
            imprimir("Contact")
            break;
        case "Stats":
            imprimir("Stats")
            break;
        default:
            imprimir("Home")

    }
}

// Dinamismo a <  > Primero boton derecho
var buttonDer = document.getElementById("butDer")
buttonDer.addEventListener("click", function (e) {
    var page = document.getElementById("name").innerText
    if (buttonNavegacion.indexOf(page) < 4) {
        changePage(buttonNavegacion.indexOf(page) + 1)

    } else {
        changePage(0)
    }

})

// Dinamismo a <  > Ahora boton Izquierdo

var buttonIzq = document.getElementById("butIz")
buttonIzq.addEventListener("click", function (e) {
    var page = document.getElementById("name").innerText
    if (buttonNavegacion.indexOf(page) > 0) {
        changePage(buttonNavegacion.indexOf(page) - 1)

    } else {
        changePage(4)
    }

})
// Cambio de Paginas con < >
function changePage(i) {
    console.log(i)
    switch (i) {
        case 0: display(eventos)
            inputSearch.style.display = "flex"
            document.getElementById("name").innerHTML = buttonNavegacion[i]
            console.log(eventos)
            checkCategories.style.display = "flex"
            todosLosEventos.style.display = "flex"
            estadisticas.style.display = "none"
            formulario.style.display = "none"
            inicioEstadisticas().style.display="none"

            break;

        case 1: display(eventosFuturos)
            inputSearch.style.display = "flex"
            document.getElementById("name").innerHTML = buttonNavegacion[i]
            console.log(eventosFuturos)
            inicioEstadisticas().style.display="none"
            break;

        case 2: display(eventosPasados)
            inputSearch.style.display = "flex"
            checkCategories.style.display = "flex"
            todosLosEventos.style.display = "flex"
            estadisticas.style.display = "none"
            formulario.style.display = "none"
            document.getElementById("name").innerHTML = buttonNavegacion[i]
            console.log(eventosPasados)
            inicioEstadisticas().style.display="none"
            break;

        case 3: imprimirFormulario()
            inputSearch.style.display = "none"
            checkCategories.style.display = "none"
            formulario.style.display = "flex"
            todosLosEventos.style.display = "none"
            estadisticas.style.display = "none"
            document.getElementById("name").innerHTML = buttonNavegacion[i]
            console.log("Estoy En Formulario")
            inicioEstadisticas().style.display="none"
            break;

        default: imprimirStats()
           
            todosLosEventos.style.display = "none"
            inputSearch.style.display = "none"
            checkCategories.style.display = "none"
            estadisticas.style.display = "flex"
            formulario.style.display = "none"
            document.getElementById("name").innerHTML = buttonNavegacion[i]
            console.log("Estoy En Stats")
            inicioEstadisticas().style.display="flex"

    }
}

function imprimirFormulario() {
    document.getElementById("formulario").innerHTML = `
    <div class="formulario">
    <div class="row">
        <form class="col s12">
            <div class="row">
                <div class="input-field col s6">
                    <i class="material-icons prefix">account_circle</i>
                    <input id="icon_prefix" type="text" class="validate" placeholder= "Nombre y Apellido" required>
                    <label for="icon_prefix"></label>
                </div>
                <div class="input-field col s6">
                    <i class="material-icons prefix">phone</i>
                    <input id="icon_telephone" type="tel" class="validate" placeholder= "Telefono" required>
                    <label for="icon_telephone"></label>
                </div>
                <div class="input-field col s6">
                    <i class="material-icons prefix">email</i>
                    <input id="icon_prefix" type="text" class="validate" placeholder= "E-mail" required>
                    <label for="icon_prefix"></label>
                </div>
                <div class="input-field col s6">
                <input type="radio" id= "Female" name="genero" value= "Female">
                <label for = "Female">Female</label>
                <input type="radio" id= "Male" name="genero" value= "Male">
                <label for = "Male">Male</label>
            </div>
                <button class="btn" type="submit" value = "Enviar">Enviar
                    <i class="material-icons right">send</i>
                </button>
            </div>
        </form>
    </div>
</div>
    `
}

function imprimirStats() {
    document.getElementById("estadisticas").innerHTML = `
    
    <div id="estadisticas">
    <table>
        <tr class="color">
          <th colspan="3">Estadísticas de Eventos</th>
        </tr>
        <tr class="titulo">
          <th>Evento con Mayor Porcentaje de Asistencia</th>
          <th>Evento con Menor Porcentaje de Asistencia</th>
          <th>Evento de Mayor Capacidad</th>
        </tr>
        <tr id="mayoresYmenores">

        </tr>
      </table>  
      <table id="Futuros">

        <tr class="color">
          <th colspan="3">Estadisticas de Eventos Futuros por Categoría</th>
        </tr>
        <tr class="titulo">
          <th>Categorías</th>
          <th>Estimacion de Ingresos</th>
          <th>Asistencia Estimada</th>
        </tr>
 
      </table>  

      <table id="Pasados">
        <tr class="color">
            <th colspan="3">Estadisticas de Eventos Pasados por Categoría</th>
        </tr>
        <tr class="titulo">
          <th>Categorías</th>
          <th>Ingresos</th>
          <th>Asistencia Estimada</th>
        </tr>

      </table>
</div>
    `

}

// ---------Filtro por barra de busqueda---------------

var inputSearch = document.getElementById("inputSearch")

inputSearch.addEventListener("keyup", function (evento) { capturaEvento(evento) })

function capturaEvento(evento) {
    var datoInput = evento.target.value
    // var datoSinEspacio = datoInput.trim().toLowerCase()
    search = datoInput.trim().toLowerCase()

    filtrosCombinados()

}


//Creacion dinamica de checkbox

function eventsCategories(array) {
    let categories = array.map(evento => evento.category)
   
    // Para filtrar si tengo categorias repetidas y para la creacion de checkbox lo necesito solo 1 vez

    let unica = new Set(categories) // new Set Me devuelve un objeto con los datos unicos, asi esten repetidos.
    

    // Aparto los datos no repetidos

    let lastCategories = [...unica]
    

    let categoriasEventos = ""
    lastCategories.map(category =>  //Evitamos que se repitan datos filtramos
        categoriasEventos +=
        `
    <label><input type="checkbox" value ="${category}" >${category}</label>
    `
    )
    document.getElementById("checkCategories").innerHTML = categoriasEventos

    checkboxListener()

}

function checkboxListener() {
    //ESCUCHA Y GUARDADO DE CHECKBOX CHECKED
    // Por un selectorAll capturo las etiquetas input de tipo checkbox
    var checkboxes = document.querySelectorAll("input[type=checkbox]");
 
    // recorro cada uno de los input checkbox y les aplico un escuchador de eventos change
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener("change", function () {

            // limpio el array donde voy a guardar los input con checked true ya que utilizo un metodo push
            // caso contrario se van a agregar mas eventos

            checkedCheckBoxes = [];

            // recorro el array de checkbox para extrer aquellos cuyo atributo checked sea true

            for (let i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    // si se cumple la condicion de checked true los empujo al array que defini para almacenar
                    // los checkbox chequeados
                    checkedCheckBoxes.push(checkboxes[i].value);

                }

            }
           filtrosCombinados()
           
        });

    }
}


function filtrosCombinados() {

    var filtrado = []

    if (search !== "" && checkedCheckBoxes.length > 0) {

        checkedCheckBoxes.map(category => filtrado.push(...arrayAFiltrar.filter(evento =>
            evento.name.toLowerCase().includes(search) && evento.category === category)
        ))

    } else if (search !== "" && checkedCheckBoxes.length === 0) {
        filtrado = arrayAFiltrar.filter(evento => evento.name.toLowerCase().includes(search))

    } else if (search === "" && checkedCheckBoxes.length > 0) {
        checkedCheckBoxes.map(category =>
            filtrado.push(...arrayAFiltrar.filter(evento => evento.category === category))
        )
 
    } else {
        filtrado = arrayAFiltrar
    }
    filtrado.length > 0 ? display(filtrado) : nombreEventos.innerHTML = 
    
    `<h1 class="ceroResult">No se encontraron eventos para tu busqueda </h1>`


}


// ---------------------Captura de datos del form-----------------

function actionForm(event) {
    event.preventDefault()
    console.log(event.target[0].value)

    let formData = {
        Nombre: event.target[0].value,
        Telefono: event.target[1].value,
        Email: event.target[2].value,
        Sexo: event.target[3].value,
    }
    
}


