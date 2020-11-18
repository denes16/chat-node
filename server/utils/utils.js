
const crearMsg = (nombre, msg) => {
    return {
        nombre,
        msg,
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
