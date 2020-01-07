class Hora {

    constructor(){

    }

    /**
     * Metodo que indica si una hora esta dentro del rango
     * @param {*} horaTablero 
     * @param {*} horaInicio 
     * @param {*} horaFinal 
     */
    dentroDelRango = ( horaTablero, horaInicio, horaFinal) =>  horaTablero >= horaInicio && horaTablero <= horaFinal ? true : false;

    /**
     *
     * @param horaInicio
     * @param horaFinal
     * @param Tablero
     * @returns {boolean}
     */
    dentroDelRangoDelHorario = (horaInicio, horaFinal, tablero) =>{
        if (this.esMenor(horaInicio, hora.convertirADate(tablero[1][0])) || this.esMayor(horaFinal, hora.convertirADate(tablero[tablero.length - 1][0]))) {
            return false;
        }
        return true;
    }
    

    /**
     * Metodo que genera los rangos que desea el usuario
     * @param {array} hora1 Hora inicial del horario
     * @param {array} hora2 Hora final del horario
     */
     generarRango(horaMinuto1, horaMinuto2) {
        let rangos = [];
        let hora1 = this.leerHora( horaMinuto1[0], horaMinuto1[1] );
        let hora2 = this.leerHora( horaMinuto2[0], horaMinuto2[1] );

        while (hora1 < hora2) {
            rangos.push(this.retornarHoras(hora1));
            hora1 = this.sumarMinutos(hora1, 14);
            rangos.push(this.retornarHoras(hora1));
            hora1 = this.sumarMinutos(hora1, 1);
        }
        return rangos;
    }

    /**
     * Metodo que convierte a Date la hora del tablero
     * @param {string} hora 
     */
    convertirADate(hora){
        let array = hora.split(":");
        let horas = this.quitarCero(array[0]);
        let minuto = this.quitarCero(array[1]);
        let aux = new Date();
        aux.setHours(horas);
        aux.setMinutes(minuto);
        aux.setSeconds(0);
        aux.setMilliseconds(0);
        return aux;
    }

    /**
     * Metodo que retorna unicamente las horas
     * @param {Date} horas
     */
    retornarHoras = (horas) => this.addCero(horas.getHours())+":"+this.addCero(horas.getMinutes());

    /**
     * Metodo para añadir el cero a las horas
     * @param {number} horas
     */
    addCero = (i) => (i < 10) ? "0" + i : i;

    /**
     * Metodo para quitar el cero a las horas o a los minutos
     * @param {string} i
     */
    quitarCero = (i) => (i < 10) ? i.charAt(i.length-1) : i;
      

    /**
     * Metodo para leer las horas
     * @param {number} hora
     * @param {number} minuto
     */
    leerHora (hora, minuto) {
        let aux = new Date();
        if (hora > 23 || hora < 0) {
            console.log("Hora invalida, vuelva a intentarlo");
            return -1;
        } else {
            aux.setHours(hora);
            aux.setMinutes(minuto);
            aux.setSeconds(0);
            aux.setMilliseconds(0);
            return aux;
        }
    }

    /**
     * Verificar si las horas son iguales
     * @param {Date} hora1 
     * @param {Date} hora2 
     */
     esIgual = (hora1, hora2) => (hora1 == hora2) ? true : false;

    /**
     * Verificar si la primera hora es menor que la segunda
     * @param {Date} hora1 
     * @param {Date} hora2 
     */
     esMenor = (hora1, hora2) => (hora1 < hora2) ? true : false;

    /**
     * Verificar si la primera hora es mayor que la segunda
     * @param {Date} hora1 
     * @param {Date} hora2 
     */
     esMayor = (hora1, hora2) => (hora1 > hora2) ? true : false;
     
    /**
     * Metodo que indica si la primera hora es igual o mayor a la segunda hora
     * @param {Date} hora1 
     * @param {Date} hora2 
     */
     esIgualOMayor = (hora1, hora2) => (hora1 >= hora2) ? true : false;

    /**
     * Metdo que indica si la primera hota es igual o menor a la segunda hora
     * @param {Date} hora1 
     * @param {Date} hora2 
     */
     esIgualOMenor = (hora1, hora2) => (hora1 <= hora2) ? true : false;

    /**
     * Metodo para sumar minutos
     * @param {Date} hora 
     * @param {Date} minutos 
     */
     sumarMinutos = (hora, minutos) => {
        hora.setMinutes(hora.getMinutes() + minutos);
        return hora;
    }

}