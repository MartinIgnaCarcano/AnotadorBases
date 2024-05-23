var jugadores = []
var apuestas = []
var gano = []

function jugarRonda(){
    llenarApuestas();
    agregarApuestas();
    llenarGano();
    verificarApuestas();
    cambioDeMano();
    mostrarJugadores();
}

function llenarApuestas(){
    for(var i=0; i<jugadores.length;i++){
        var apuesta = document.getElementById("apuesta"+i)
        apuestas[i] = Number(apuesta.value.trim())
    }
}

function llenarGano(){
    var boton
    for(var i=0; i<jugadores.length;i++){
        boton = document.getElementById("boton" + i)
        if (boton.style.backgroundColor == 'green') {
            gano[i]=true
        } else {
            gano[i]=false
        }
    }
    
    
}

function cambioDeMano() {
    var aux = jugadores.shift()
    jugadores.push(aux)
}

function agregarApuestas() {
    for (var i = 0; i < jugadores.length; i++) {
        jugadores[i].apuesta = apuestas[i]
        console.log(jugadores[i].nombre + " = " + jugadores[i].apuesta)
    }
}

function verificarApuestas() {
    for (var i = 0; i < jugadores.length; i++) {
        if (gano[i]) {
            jugadores[i].puntos += (5 + Number(apuestas[i]))
        } else {
            if (apuestas[i] == 0) {
                jugadores[i].puntos -= 2
            } else {
                jugadores[i].puntos -= apuestas[i]
            }
        }
    }
}

function agregarJugador() {
    var nombreAux = document.getElementById("nombreInput")
    var nombre = nombreAux.value.trim()
    jugadores.push({
        id: jugadores.length,
        nombre: nombre,
        puntos: 0,
        apuesta: 0
    })
    nombreAux.value = ""
    mostrarJugadores();
}


function mostrarJugadores() {
    // Obtener el contenedor principal
    var contenedorJugadores = document.getElementById("contenedorJugadores");

    // Limpiar el contenedor principal
    contenedorJugadores.innerHTML = "";

    // Iterar sobre el arreglo de jugadores y crear divs
    jugadores.forEach(function (jugador, index) {
        // Crear el div principal del jugador
        var divJugador = document.createElement("div");
        divJugador.className = "jugador";

        // Crear el div del nombre
        var divNombre = document.createElement("div");
        divNombre.className = "nombre";
        var h1Nombre = document.createElement("h1");
        h1Nombre.textContent = jugador.nombre;
        divNombre.appendChild(h1Nombre);

        // Crear el div de stats
        var divStats = document.createElement("div");
        divStats.className = "stats";

        // Crear el div de puntos
        var divPuntos = document.createElement("div");
        divPuntos.className = "puntos";
        var h2Puntos = document.createElement("h2");
        h2Puntos.textContent = "Puntos: " + jugador.puntos;
        divPuntos.appendChild(h2Puntos);

        // Crear el div de apuesta
        var divApuesta = document.createElement("div");
        divApuesta.className = "apuesta";
        var h2Apuesta = document.createElement("h2");
        h2Apuesta.textContent = "Apuesta: ";
        var inputApuesta = document.createElement("input");
        inputApuesta.type = "text";
        inputApuesta.name = "apuestaActual";
        inputApuesta.id = "apuesta"+index
        inputApuesta.value = jugador.apuesta; // Establecer valor inicial
        divApuesta.appendChild(h2Apuesta);
        divApuesta.appendChild(inputApuesta);

        // Crear el div de botón
        var divGano = document.createElement("div");
        divGano.className = "gano";
        var botonGano = document.createElement("button");
        botonGano.type = "button";
        botonGano.textContent = "¿Ganó?";
        botonGano.id = "boton" + (index);
        botonGano.onclick = function () {
            apretobotonGano(index) ;
        };
        divGano.appendChild(botonGano);

        // Agregar los divs de stats al divStats
        divStats.appendChild(divPuntos);
        divStats.appendChild(divApuesta);
        divStats.appendChild(divGano);

        //Agregar Eliminar
        var divEliminar = document.createElement("div");
        divEliminar.className = "eliminar";
        var botonEliminar = document.createElement("button");
        botonEliminar.type = "button";
        botonEliminar.textContent = "X";
        botonEliminar.id = "eliminar" + (index + 1);
        botonEliminar.onclick = function () {
            eliminarJugador(index);
        };
        divEliminar.appendChild(botonEliminar)

        // Agregar los divs nombre y stats al div principal del jugador
        divJugador.appendChild(divNombre);
        divJugador.appendChild(divStats);
        divJugador.appendChild(divEliminar)

        // Agregar el div principal del jugador al contenedor principal
        contenedorJugadores.appendChild(divJugador);
    });
}

function apretobotonGano(indice) {
    var boton = document.getElementById("boton" + indice)
    if (boton.style.backgroundColor == 'green') {
        boton.style.backgroundColor = 'red'
        boton.style.color = 'black'
    } else {
        boton.style.backgroundColor = 'green'
        boton.style.color = 'white'
    }
}

function eliminarJugador(indice) {
    if (confirm("¿Seguro que deseas eliminar a este jugador?")) {
        jugadores.splice(indice, 1);
        mostrarJugadores(); // Volver a mostrar los jugadores actualizados
    }
}

function cambiarPuntos(){
    for(var i=0;i<jugadores.length;i++){
        var texto = "Puntos de "+jugadores[i].nombre+" son: "+jugadores[i].puntos
        jugadores[i].puntos=prompt(texto,jugadores[i].puntos)
    }
    mostrarJugadores();
}


