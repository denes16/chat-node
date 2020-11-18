
const crearMsg = (nombre, mensaje) => {
    return {
        nombre,
        mensaje,
        fecha: new Date().getTime()
    };
};

const validarMsg = (s) => {
    if(!s.msg)
    {
        return false;
    }
    return true;
};

module.exports = {
    crearMsg,
    validarMsg
};
