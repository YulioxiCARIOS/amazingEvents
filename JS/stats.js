async function inicioEstadisticas() {
    console.log(eventos)

    var categoria = []

    var unique = eventos.map(evento => evento.category)// obtenemos categorias unicas
    const quitoCateRepetidas = new Set(unique)
    categoria = [...quitoCateRepetidas]

    console.log(categoria)


    var porCategoria = [] //Agruppamos los eventos por categoria

    categoria.forEach(categoria => {

        porCategoria.push(
            {
                categoria: categoria,
                data: eventos.filter(evento => evento.category === categoria)
            }
        )
    });
    console.log(porCategoria)
    //Obtenemos datos de ingresos o estimaciones por categoria

    var ingresoYasistencia = []
    porCategoria.map(datos => {
        ingresoYasistencia.push({
            categoria: datos.categoria,
            ingreso: datos.data.map(item => item.assistance ? item.assistance * item.price : 0),
            estimacionIngreso: datos.data.map(item => item.estimate ? item.estimate * item.price : 0),
            asistencia: datos.data.map(item => item.assistance ? item.assistance : 0),
            estimacionAsistencia: datos.data.map(item => item.estimate ? item.estimate : 0),
            capacidad: datos.data.map(item => item.capacity ? item.capacity : 0)

        })

    })

    console.log(ingresoYasistencia)

    ingresoYasistencia.forEach(categoria => {

        let totalAsistencia = 0
        let totalAsistenciaEstimada = 0
        let totalCapacidadFuturos = 0
        let totalCapacidadPasados = 0

        for (var i = 0; i < categoria.ingreso.length; i++) {
            if (categoria.ingreso[i] > 0) {
                totalCapacidadPasados += categoria.capacidad[i]
                totalAsistencia += categoria.asistencia[i]
                categoria.totalCapacidadPasados = totalCapacidadPasados
                categoria.totalAsistencia = totalAsistencia
            } else {
                totalCapacidadFuturos += categoria.capacidad[i]
                totalAsistenciaEstimada += categoria.estimacionAsistencia[i]
                categoria.totalCapacidadFuturos = totalCapacidadFuturos
                categoria.totalAsistenciaEstimada = totalAsistenciaEstimada
            }
        }
        categoria.porcentajeDeAsistencia = ((totalAsistencia * 100) / totalCapacidadPasados).toFixed(2) + " %"
        categoria.porcentajeDeEstimacion = ((totalAsistenciaEstimada * 100) / totalCapacidadFuturos).toFixed(2) + " %"
        categoria.nuevaProp = "Test"// creo una nueva categoria


        //Calculo el total de ingresos (PASADOS)
        let totalIngreso = 0
        categoria.ingreso.map(ingresos => totalIngreso += ingresos)
        categoria.ingresos = totalIngreso

        //Calculo el total de estimacion de ingresos (FUTUROS)
        let totalIngresoEstimado = 0
        categoria.estimacionIngreso.map(ingresosEstimados => totalIngresoEstimado += ingresosEstimados)
        categoria.estimacionIngresos = totalIngresoEstimado

    })
    //Obtenemos el evento de mayor asistencia(Cantidad/Valor numerico)

    let eventosPasados = []//Separo eventos pasados poseen asistencia
    let eventosFuturos = []
    await eventos.filter(evento => {
        if (evento.assistance) {
            eventosPasados.push(evento)
        } else { eventosFuturos.push(evento) }
    })

    eventosPasados.map(evento => {
        evento.porcentajeDeAsistencia = evento.assistance * 100 / evento.capacity//Creo la propiedad, porcentaje de asistencia dentro del objeto de evento
    })//creo una propiedad calculando el porcentaje
    console.log(eventosPasados)




    let estimacionEventos = []

    let asistenciaEventos = []
    //filtro todos los eventos que tienen asistencia(Eventos pasados)
    eventosPasados.filter(evento => { asistenciaEventos.push(evento.porcentajeDeAsistencia) })
    //filtro todos los eventos que tienen estimacion (Eventos futuros)
    eventos.filter(evento => { if (evento.estimate) { estimacionEventos.push(evento.estimate) } })
    //Busco el evento de mayor asistencio con math.max
    let mayor = Math.max(...asistenciaEventos) //Busco el evento con mayor asistencia

    let eventoMayor = eventos.filter(evento => evento.porcentajeDeAsistencia === mayor)//Busco mediante un filtro los datos del evento con mayor porcentaje asistencia === al mayor
    console.log(eventoMayor)

    //Busco el evento de menor asistencio con math.max
    let menor = Math.min(...asistenciaEventos)
    //Busco mediante un filtro los datos del evento con la asistencia === al menor
    let eventoMenor = eventos.filter(evento => evento.porcentajeDeAsistencia === menor)// busco evento con menor porcentaje de asistencia
    console.log(eventoMenor)


    //Busco evento con mayor capacidad Ascendente
    let mayorCapacidad = eventos.sort((a, b) => { return a.capacity - b.capacity })
    console.log(mayorCapacidad)
    //Busco evento con mayor capacidad descendente
    let menorCapacidad = eventos.sort((a, b) => { return b.capacity - a.capacity })
    console.log(menorCapacidad)


    //     console.log(mayor)


    //     console.log(menor)
    //     console.log(estimacionEventos)
    //     console.log(asistenciaEventos)
    //     console.log(ingresoYasistencia)



    //Genero datos en tablas por porcentajes
    var rowMayoresYmenores = document.getElementById("mayoresYmenores")

    var tdMayorAsistencia = document.createElement("td")
    var tdMenorAsistencia = document.createElement("td")
    var tdmayorCapacidad = document.createElement("td")

    rowMayoresYmenores.append(tdMayorAsistencia)
    tdMayorAsistencia.append(eventoMayor[0].name + " " + eventoMayor[0].porcentajeDeAsistencia + "%")

    rowMayoresYmenores.append(tdMenorAsistencia)
    tdMenorAsistencia.append(eventoMenor[0].name + " " + eventoMenor[0].porcentajeDeAsistencia + "%")

    rowMayoresYmenores.append(tdmayorCapacidad)
    tdmayorCapacidad.append(mayorCapacidad[0].name + " (" + mayorCapacidad[0].category + ")")


    //Generar datos de los eventos futuros
    console.log("FUTUROS", eventosFuturos)
    console.log("PASADOS", eventosPasados)

    var tablaFuturos = document.getElementById("Futuros")
let ordenarFuturos = []
ordenarFuturos.push(...ingresoYasistencia.sort((a,b)=>{
    return b.estimacionIngreso-a.estimacionIngreso
}))



ordenarFuturos.map(evento =>{
            if (evento.estimacionIngresos > 0) {

                tablaFuturos.innerHTML +=
        

    `  
    <tr>
      <td>${evento.categoria}</td>
      <td>${evento.estimacionIngresos}</td>
      <td>${(evento.porcentajeDeEstimacion)}</td>
    </tr>
    `

    }

})

        //Generar datos de los eventos Pasados
    
        var tablaPasados = document.getElementById("Pasados")

        let ordenarPasados=[]
        ordenarPasados.push(...ingresoYasistencia.sort((a,b)=>{
            return b.ingresos - a.ingresos
        }))
    
        ordenarPasados.map(evento=>{
            if (evento.ingresos > 0) {
           
            tablaPasados.innerHTML +=
        `  
        <tr>
          <td>${evento.categoria}</td>
          <td>${evento.ingresos}</td>
          <td>${(evento.porcentajeDeAsistencia)}</td>
        </tr>
        `
            }

        })
    

}




inicioEstadisticas()

