var jugadores = []
var apuestas = []
var gano = []
var ronda = 1
var cantidad = 0
var baja = true
var chekeado = false

function jugarRonda() {
    if (chekeado) {
        if (llenarGano()) {
            llenarApuestas()
            agregarApuestas();
            llenarGano();
            verificarApuestas();
            cambioDeMano();
            mostrarJugadores();
            chekeado = false
            var chekear = document.getElementById("botonCheck")
            chekear.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
        }
    } else {
        alert("Las apuestas no estan chekeadas")
    }
}

function chekearApuestas() {
    var suma = 0
    for (var i = 0; i < jugadores.length; i++) {
        var apuesta = document.getElementById("numeroApuesta" + i)
        suma += Number(apuesta.innerHTML)
    }
    var ultima = document.getElementById("numeroApuesta" + (jugadores.length - 1)).innerHTML
    if (suma == ronda) {
        alert(jugadores[(jugadores.length - 1)].nombre + " debe apostar un número diferente de: " + ultima)
        chekeado = false;
    } else {
        chekeado = true;
        var chekear = document.getElementById("botonCheck")
        chekear.style.backgroundColor = 'green'
    }
}

function llenarApuestas() {
    for (var i = 0; i < jugadores.length; i++) {
        var apuesta = document.getElementById("numeroApuesta" + i)
        apuestas[i] = Number(apuesta.innerHTML)
    }
}

function llenarGano() {
    var boton
    var devolver = false
    for (var i = 0; i < jugadores.length; i++) {
        boton = document.getElementById("boton" + i)
        if (boton.style.backgroundColor == 'green') {
            gano[i] = true
            devolver = true
        } else if (boton.style.backgroundColor == 'red') {
            gano[i] = false
            devolver = true
        } else {
            alert(jugadores[i].nombre + " no selecciono gano")
            devolver = false
            break
        }
    }
    return devolver
}

function cambioDeMano() {
    if (ronda == 1) {
        if (jugadores.length == 7) {
            cantidad = 7
        } else {
            cantidad = 8
        }
    }
    if (ronda != cantidad & baja) {
        ronda += 1
    } else {
        ronda -= 1
        baja = false
    }
    console.log("ronda: " + ronda)
    console.log("cantidad: " + cantidad)
    if (ronda == 0) {
        buscarGanador()
    } else {
        var h1 = document.getElementById("cr")
        h1.textContent = "CR: " + ronda
        var aux = jugadores.shift()
        jugadores.push(aux)
    }

}

function agregarApuestas() {
    for (var i = 0; i < jugadores.length; i++) {
        jugadores[i].apuesta = apuestas[i]
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
        /* 
        var divApuesta = document.createElement("div");
        divApuesta.className = "apuesta";
        var h2Apuesta = document.createElement("h2");
        h2Apuesta.textContent = "Apuesta: ";
        var inputApuesta = document.createElement("input");
        inputApuesta.type = "text";
        inputApuesta.name = "apuestaActual";
        inputApuesta.id = "apuesta" + index
        inputApuesta.value = jugador.apuesta; // Establecer valor inicial
        divApuesta.appendChild(h2Apuesta);
        divApuesta.appendChild(inputApuesta);
        */ 
        //Crear el div apuesta
        var divApuesta = document.createElement("div");
        divApuesta.className = "apuesta";
        //Creamos el divResta
        var divResta = document.createElement("div");
        divResta.className = "resta";
        var botonResta = document.createElement("button");
        botonResta.type = "button";
        botonResta.textContent = "-";
        botonResta.id = "resta"+(index)
        botonResta.onclick = function() {
            apretoBotonResta(index);
        }
        divResta.appendChild(botonResta)
        //Crear el div numero
        var divNumeroApuesta = document.createElement("div");
        divNumeroApuesta.className = "numeroApuesta"
        var h2Numero = document.createElement("h2")
        h2Numero.textContent = "0"
        h2Numero.id = "numeroApuesta"+(index)
        divNumeroApuesta.appendChild(h2Numero)
        //Crear el div suma
        var divSuma = document.createElement("div");
        divSuma.className = "suma";
        var botonSuma = document.createElement("button");
        botonSuma.type = "button";
        botonSuma.textContent = "+";
        botonSuma.id = "suma"+(index)
        botonSuma.onclick = function() {
            apretoBotonSuma(index);
        }
        divSuma.appendChild(botonSuma)

        //Añadir a apuesta
        divApuesta.appendChild(divResta)
        divApuesta.appendChild(divNumeroApuesta)
        divApuesta.appendChild(divSuma)

        // Crear el div de botón
        var divGano = document.createElement("div");
        divGano.className = "gano";
        var botonGano = document.createElement("button");
        botonGano.type = "button";
        botonGano.textContent = "¿Ganó?";
        botonGano.id = "boton" + (index);
        botonGano.onclick = function () {
            apretobotonGano(index);
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

function cambiarPuntos() {
    for (var i = 0; i < jugadores.length; i++) {
        var texto = "Puntos de " + jugadores[i].nombre + " son: " + jugadores[i].puntos
        jugadores[i].puntos = Number(prompt(texto, jugadores[i].puntos))
    }
    mostrarJugadores();
}

function buscarGanador() {
    var p = 0
    for (var i = 1; i < jugadores.length; i++) {
        if (jugadores[i].puntos > jugadores[p].puntos) {
            p = i
        } else if (jugadores[i].puntos = jugadores[p].puntos) {
            alert("REVISAR PORQUE PUEDE HABER EMPATE")
        }
    }
    alert("El ganador fue: " + jugadores[p].nombre + " con " + jugadores[p].puntos + " puntos")
}

function apretoBotonResta(indice){
    var textoH2 = document.getElementById("numeroApuesta"+indice)
    var numero = Number(textoH2.innerHTML)
    if(numero!=0){
        textoH2.innerHTML = numero-1
    }
}
function apretoBotonSuma(indice){
    var textoH2 = document.getElementById("numeroApuesta"+indice)
    var numero = Number(textoH2.innerHTML)
    if(numero<ronda){
        textoH2.innerHTML = numero+1
    }
    
}