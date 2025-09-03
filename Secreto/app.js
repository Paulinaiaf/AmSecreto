

let amigos = [];


const MENSAJES = {
    CAMPO_VACIO: "Por favor, inserte un nombre.",
    NOMBRE_DUPLICADO: "Este nombre ya está en la lista.",
    NOMBRE_MUY_CORTO: "El nombre debe tener al menos 2 caracteres.",
    SIN_AMIGOS: "Debes agregar al menos un amigo para realizar el sorteo.",
    NOMBRE_INVALIDO: "El nombre solo puede contener letras y espacios."
};


function agregarAmigo() {
    console.log(" Iniciando proceso de agregar amigo...");
    
    
    const campoAmigo = document.getElementById('amigo');
    const nombreAmigo = campoAmigo.value.trim(); 

    if (nombreAmigo === '') {
        mostrarAlerta(MENSAJES.CAMPO_VACIO, 'warning');
        enfocarCampo(campoAmigo);
        return; 
    }
    
   
    if (nombreAmigo.length < 2) {
        mostrarAlerta(MENSAJES.NOMBRE_MUY_CORTO, 'warning');
        enfocarCampo(campoAmigo);
        return;
    }
    
    
    if (!REGEX_NOMBRE.test(nombreAmigo)) {
        mostrarAlerta(MENSAJES.NOMBRE_INVALIDO, 'warning');
        enfocarCampo(campoAmigo);
        return;
    }
    
    
    if (amigos.some(amigo => amigo.toLowerCase() === nombreAmigo.toLowerCase())) {
        mostrarAlerta(MENSAJES.NOMBRE_DUPLICADO, 'info');
        enfocarCampo(campoAmigo);
        return;
    }
    
    amigos.push(nombreAmigo);
    console.log(`✅ Amigo agregado: ${nombreAmigo}. Total de amigos: ${amigos.length}`);
    
    
    campoAmigo.value = '';
  
    mostrarAmigos();
    
  
    mostrarAlerta(`¡${nombreAmigo} agregado exitosamente!`, 'success');
    
   
    enfocarCampo(campoAmigo);
}


function mostrarAmigos() {
    console.log(" Actualizando lista de amigos...");
    
   
    const listaAmigos = document.getElementById('listaAmigos');
    
    listaAmigos.innerHTML = '';
    
    if (amigos.length === 0) {
        listaAmigos.innerHTML = '<li class="empty-state">No hay amigos agregados aún...</li>';
        return;
    }
    
   
    amigos.forEach((amigo, indice) => {
        
        const elementoAmigo = document.createElement('li');
        
        elementoAmigo.innerHTML = `
            <span class="friend-name">${amigo}</span>
            <button class="btn-remove" onclick="eliminarAmigo(${indice})" title="Eliminar ${amigo}">
                ✕
            </button>
        `;
 
        elementoAmigo.classList.add('friend-item', 'fade-in');

        listaAmigos.appendChild(elementoAmigo);
    });
    
    console.log(`📋 Lista actualizada con ${amigos.length} amigos`);
}

function sortearAmigo() {
    console.log(" Iniciando sorteo...");
    

    if (amigos.length === 0) {
        mostrarAlerta(MENSAJES.SIN_AMIGOS, 'warning');
        return;
    }
    const elementoResultado = document.getElementById('resultado');
    elementoResultado.innerHTML = '<li class="loading"> Sorteando...</li>';
    elementoResultado.classList.add('loading');
    setTimeout(() => {

        const indiceAleatorio = Math.floor(Math.random() * amigos.length);
      
        const amigoSorteado = amigos[indiceAleatorio];
        
        console.log(` Resultado del sorteo: ${amigoSorteado} (índice: ${indiceAleatorio})`);
        
        elementoResultado.classList.remove('loading');
        elementoResultado.innerHTML = `
            <li class="winner">
                 <strong>¡El amigo secreto es:</strong> <span class="winner-name">${amigoSorteado}</span> 
            </li>
        `;
        
       
        elementoResultado.classList.add('bounce-in');
        
     
        setTimeout(() => {
            elementoResultado.classList.remove('bounce-in');
        }, 800);
        
    }, 1000); 
}




function eliminarAmigo(indice) {
    const amigoEliminado = amigos[indice];
    
    
    if (confirm(`¿Estás seguro de que quieres eliminar a ${amigoEliminado}?`)) {
        amigos.splice(indice, 1); 
        mostrarAmigos(); 
        limpiarResultado();
        
        console.log(`🗑️ Amigo eliminado: ${amigoEliminado}`);
        mostrarAlerta(`${amigoEliminado} eliminado de la lista`, 'info');
    }
}



function mostrarAlerta(mensaje, tipo = 'info') {
 
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} alert-custom`;
    alerta.textContent = mensaje;

    document.body.appendChild(alerta);
 
    setTimeout(() => alerta.classList.add('show'), 100);
    setTimeout(() => {
        alerta.classList.remove('show');
        setTimeout(() => document.body.removeChild(alerta), 300);
    }, 3000);
}


function enfocarCampo(campo) {
    campo.focus();
    campo.select(); 
}


function limpiarResultado() {
    const elementoResultado = document.getElementById('resultado');
    elementoResultado.innerHTML = '';
    elementoResultado.className = 'result-list'; 
}


function limpiarTodo() {
    if (confirm('¿Estás seguro de que quieres limpiar toda la lista?')) {
        amigos = []; 
        mostrarAmigos(); 
        limpiarResultado(); 
        document.getElementById('amigo').value = ''; 
        
        mostrarAlerta('Lista limpiada completamente', 'info');
        console.log('🧹 Aplicación limpiada completamente');
    }
}


document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Aplicación Amigo Secreto iniciada');
    
    const campoAmigo = document.getElementById('amigo');
    campoAmigo.addEventListener('keypress', function(evento) {
      
        if (evento.key === 'Enter' || evento.keyCode === 13) {
            evento.preventDefault(); 
            agregarAmigo();
        }
    });

    campoAmigo.focus();

    const seccionInput = document.querySelector('.input-section');
    const botonLimpiar = document.createElement('button');
    botonLimpiar.innerHTML = 'Limpiar Todo';
    botonLimpiar.className = 'btn btn-outline-danger btn-sm mt-3';
    botonLimpiar.onclick = limpiarTodo;
    seccionInput.appendChild(botonLimpiar);
});



function generarDatosPrueba() {
    const nombresPrueba = ['Ana', 'Carlos', 'María', 'José', 'Laura', 'Pedro'];
    nombresPrueba.forEach(nombre => {
        amigos.push(nombre);
    });
    mostrarAmigos();
    console.log('Datos de prueba generados');
}

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.debugAmigos = {
        verAmigos: () => console.log('Amigos actuales:', amigos),
        agregarPrueba: generarDatosPrueba,
        limpiar: limpiarTodo
    };
    console.log('🔧 Funciones de debug disponibles en window.debugAmigos');
}