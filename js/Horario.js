class Horario {
    constructor() {

    }

    /**
     * Metodo que genera el tablero, 
     * solo los nombres de lso dias y el rango de horas generado
     * @param {Array} hora1
     * @param {Array} hora2
     */
    tableroHorario(hora1, hora2) {
        let hora = new Hora();
        let rangosHoras = hora.generarRango(hora1, hora2);
        let horario = this.crearArray(rangosHoras.length, 8);

        for (let i = 0; i < horario.length; i++) {
            for (let j = 0; j < horario[i].length; j++) {
                if(i == 0 && j == 0){horario[i][j] = "hora"}else if(i == 0 && j == 1){ horario[i][j] = "lunes";}else if(i == 0 && j == 2){ horario[i][j] = "martes";}else if(i == 0 && j == 3){ horario[i][j] = "miercoles";}else if(i == 0 && j == 4){ horario[i][j] = "jueves";}else if(i == 0 && j == 5){ horario[i][j] = "viernes";}else if(i == 0 && j == 6){ horario[i][j] = "sabado";}else if(i == 0 && j == 7){ horario[i][j] = "virtual";}
                if(i > 0 && j == 0){horario[i][j] = rangosHoras.shift();}
                if(horario[i][j]==""){ horario[i][j]="*"; }
            }
        }

        return horario;
    }


    
    /**
     * Metodo para inicializar una matriz estilo Java
     * @param {number} filas Cantidad de filas de la matriz
     * @param {columnas} columnas Cantidad de columnas de la matriz
     */
    crearArray(filas, columnas) {
        let aux = [];
        for (let i = 0; i <= filas; i++) {
            aux.push([]);
            for (let j = 0; j < columnas; j++) {
                aux[i].push("");
            }
        }
        return aux;
    }

    /**
     * Metodo para imprimir el tablero en la pagina
     * @param {string[]} tablero 
     */
    mostrarHorario(tablero) {
        for (let i = 0; i < tablero.length; i++) {
            for (let j = 0; j < tablero[i].length; j++) {
                document.body.innerHTML += tablero[i][j] + " ";
            }
            document.body.innerHTML += "<br>";
        }
    }


}