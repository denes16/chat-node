var socket = io();

var param = new URLSearchParams(window.location.search);
if (!param.has('nombre') || !param.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var nombre = param.get('nombre');
var sala = param.get('sala');
var usuario = {
    nombre:nombre,
    sala:sala
};


// Al conectarse
socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('entrarChat',usuario,function(resp)
    {
        console.log('Usuarios conectados',resp);
    });

});

// Desconectarse
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar msg
// socket.emit('crearMensaje', {
//     msg: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMsg', function(d) {

    console.log('Servidor:', d);

});
// Escuchar cambio de usuarios
socket.on('listaPersonas', function(d) {

    console.log('Servidor:', d);

});

// Mensaje privado
socket.on('msgPrivado',function(d){
    console.log('Mensaje privado',d);
});

