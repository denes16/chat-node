if (!String.prototype.trim) {
    (function () {
        // Make sure we trim BOM and NBSP
        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        String.prototype.trim = function () {
            return this.replace(rtrim, '');
        };
    })();
}

var param = new URLSearchParams(window.location.search);

var divUsuarios = $("#divUsuarios");
var sendMsg = $("#sendMsg");
var textMsg = $("#textMsg");
var divChat = $("#divChatbox");

function renderUsuarios(personas) {
    console.log(personas);
    var html = '';
    html += '<li>';
    html += '    <a href="javascript:void(0)" class="active">' + param.get('sala') + '</span></a>';
    html += '</li>';
    personas.forEach(function (v, i, a) {
        html += '<li>';
        html += '    <a href="javascript:void(0)" data-id="' + v.id + '"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + v.nombre + '<small class="text-success">online</small></span></a>';
        html += '</li>';
    });
    divUsuarios.html(html);
}

var renderMsg = function (msg, yo) {
    var html = '';
    var fecha = new Date(msg.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();
    var adminClass = msg.nombre === 'Admin' ? 'danger' : 'info';
    var otro = false;
    if (yo) {
        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>' + msg.nombre + '</h5>';
        html += '        <div class="box bg-light-inverse">' + msg.msg + '</div>';
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';
        otro = false;
        return divChat.append(html);
    }
    otro = msg.nombre;
    html += '<li class="animated fadeIn">';
    if (msg.nombre !== 'Admin') {
        html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
    }
    html += '    <div class="chat-content">';
    html += '        <h5>' + msg.nombre + '</h5>';
    html += '        <div class="box bg-light-' + adminClass + '">' + msg.msg + '</div>';
    html += '    </div>';
    html += '    <div class="chat-time">' + hora + '</div>';
    html += '</li>';
    divChat.append(html);

    scrollBottom(otro);
}


divUsuarios.on('click', '[data-id]', function () {
    console.log($(this).data('id'));
});

sendMsg.on('submit', function (e) {
    e.preventDefault();
    var text = textMsg.val();
    console.log(text);
    if (text.trim().length === 0) {
        return;
    }
    socket.emit('crearMsg', {
        msg: text
    }, function (resp) {
        textMsg.val('').focus();
        console.log(resp);
        renderMsg(resp, true);
    });
});


function scrollBottom(otro) {

    // selectors
    var newMessage = divChat.children('li:last-child');

    // heights
    var clientHeight = divChat.prop('clientHeight');
    var scrollTop = divChat.prop('scrollTop');
    var scrollHeight = divChat.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChat.scrollTop(scrollHeight);
    }
    else {
        if (otro) {
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
            toastr.info('Nuevo mensaje de ' + otro);
        }
    }
}


