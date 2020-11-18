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
        renderUsuarios(resp.usuarios);
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "300",
            "timeOut": "2000",
            "extendedTimeOut": "0",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };
        toastr.success('Conectado');
    });

});

// Desconectarse
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "300",
            "timeOut": "2000",
            "extendedTimeOut": "0",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };
        toastr.danger('Perdimos conexión con el servidor');

});


// Escuchar información
socket.on('crearMsg', function(d) {

    renderMsg(d);

});
// Escuchar cambio de usuarios
socket.on('listaPersonas', function(d) {

    console.log('Servidor:', d);
    renderUsuarios(d);

});

// Mensaje privado
socket.on('msgPrivado',function(d){
    console.log('Mensaje privado',d);
});