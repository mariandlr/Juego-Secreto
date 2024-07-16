let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

//se agrega un límite para que el usuario al no adivinar el número pueda reiniciar el juego
let limite = 5;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    console.log(intentos);

    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        //El usuario no acertó.
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p','El número secreto es menor');
        } else {
            asignarTextoElemento('p','El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();

        //el usuario puede reiniciar el juego si el número de intentos es mayor al limite
        if (intentos > limite) {
            //mensaje
            asignarTextoElemento('p', '¡Puedes reiniciar el juego!');
            //activar el botón de Nuevo Juego
            document.getElementById('reiniciar').removeAttribute('disabled');
        }
    }
    return;
}


function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //condición de salida
    if (listaNumerosSorteados.length == numeroMaximo) {
        //mensaje
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');

    } else {
        //sino que siga jugando
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            //si esta el número, se debe llamar así misma para generar un nuevo número
            return generarNumeroSecreto();
        } else {
            //sino que se comporte como siempre
            //y se debe hacer un push para que se agregue a la lista de numeros sorteados
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento('h1','Juego del número secreto!');
    asignarTextoElemento('p',`Ingresar un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego() {
    //limpiar caja
    limpiarCaja();
    //Indicar mensaje de intervalo de números 
    //Generar el número aleatorio
    //Inicializar el número intentos
    condicionesIniciales();
    //Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');
    
}

condicionesIniciales();