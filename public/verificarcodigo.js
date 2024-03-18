function mostrarOverlay(){
    document.getElementById('overlay').style.display = 'block';
}

function ocultarOverlay(){
    document.getElementById('overlay').style.display = 'none';
}

function verificarCodigo(){
    var codigoInserido = document.getElementById('code-input').value;
    window.location= "/trocar-senha"; 
    //logica para verificar
}