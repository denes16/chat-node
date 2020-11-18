
class Usuarios {


    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre, sala) {
        let persona = { id, nombre, sala };
        this.personas.push(persona);
        return this.personas;
    }

    getPersona(id) {
        let persona = this.personas.filter(item => item.id === id)[0];
        return persona;
    }
    getPersonas() {
        return this.personas;
    }
    getPersonasSala(sala) {
        return this.personas.filter(item => item.sala === sala);
    }
    delPersona(id) {
        let personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter(item => item.id !== id);
        return personaBorrada;
    }

}


module.exports = {
    Usuarios
};
