const { io } = require('../server');
const { Usuarios } = require('../classes/usuario');
const { crearMsg } = require('../utils/utils');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    // Login
    client.on('entrarChat', (usuario, callback) => {
        if (!usuario.nombre || !usuario.sala) {
            return callback({
                success: false,
                err: {
                    msg: 'El nombre y sala son necesarios'
                }
            });
        }
        client.join(usuario.sala);
        let users = usuarios.agregarPersona(client.id, usuario.nombre, usuario.sala);
        // Enviar lista usuarios
        client.broadcast.to(usuario.sala).emit('listaPersonas', usuarios.getPersonasSala(usuario.sala));
        return callback({
            success: true,
            usuarios: usuarios.getPersonasSala(usuario.sala)
        });
    });
    // Desconexión
    client.on('disconnect', () => {
        let personaBorrada = usuarios.delPersona(client.id);
        client.broadcast.to(personaBorrada.sala).emit('crearMsg', crearMsg('Admin', `${personaBorrada.nombre} se ha desconectado`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuarios.getPersonasSala(personaBorrada.sala));
    });

    // Recibir mensaje y enviarlo a todos
    client.on('crearMsg', (d) => {
        let p = usuarios.getPersona(client.id);
        let msg = crearMsg(p.nombre, d.msg);
        client.broadcast.to(p.sala).emit('crearMsg', msg);
    });

    // Recibir mensaje privado
    client.on('msgPrivado', (d) => {
        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(d.to).emit('msgPrivado', crearMsg(persona.nombre, d.msg));

    });

});