let hora = new Hora();

class OperacionesMateria {
    constructor() {

    }

    materiasRegistradas = [];

    /**
     * Metodo con Backtracking que genera los posibles horios con las materias deseadas
     *
     * @param {string[]} tableroHorario Tablero academico
     * @param {number} materiaElegida Materia a escoger (de cada grupo)
     * @param {Array} nrcs           Pila que guarda los nrc
     */
    generarHorarioAcademico(tableroHorario, materiaElegida, nrcs) {

        if (materiaElegida == this.materiasRegistradas.length) {//Caso base
            //horario.mostrarHorario(tableroHorario);
            this.imprimirTableroIndividual(tableroHorario);
            document.getElementById("impresion").innerHTML += nrcs;
        } else {
            //******************iterar materia individualmente*******
            for (let subMateria = 0; subMateria < this.materiasRegistradas[materiaElegida].length; subMateria++) {
                //obtener materia individualmente
                let nuevaMateria = this.materiasRegistradas[materiaElegida][subMateria];
                //introducir materia segun el dia
                let asignar = this.introducirMateriaDiaActual(tableroHorario, nuevaMateria);
                if (asignar == true) {//Meterlo en la pila de nrcs
                    nrcs.push(nuevaMateria.nombre + ": " + nuevaMateria.nrc);
                }

                //Recursividad
                this.generarHorarioAcademico(tableroHorario.slice(), materiaElegida + 1, nrcs.slice());

                //Limpiar la materia que introducimos
                tableroHorario = this.limpiarUltimaMateria(tableroHorario, nuevaMateria.nombre);
                if (!nrcs.length == 0 && asignar == true) {
                    nrcs.pop();
                }
            }
        }
    }

    /**
     * Funcion que guarda una materia, si tiene el mismo nombre
     * la guarde en ese mismo espacio
     * @param {Materia} materia
     */
    guardarMateria(materia) {
        let encontrada = false;

        for (let i = 0; i < this.materiasRegistradas.length; i++) {
            if (this.materiasRegistradas[i][0].nombre == materia.nombre) {
                this.materiasRegistradas[i].push(materia);
                encontrada = true;
                break;
            }
        }

        if (encontrada == false) {
            this.materiasRegistradas.push([materia]);
        }
    }

    /**
     *
     * @param {string[]} tableroHorario
     * @param {string} materia
     */
    limpiarUltimaMateria(tableroHorario, nombreMateria) {
        let aux = tableroHorario.slice();
        for (let i = 1; i < aux.length; i++) {
            for (let j = 1; j < aux[i].length; j++) {
                if (aux[i][j] == nombreMateria) {
                    aux[i][j] = "*";
                }
            }
        }
        return aux;
    }

    /**
     * Metodo para introducir una materia en el dia correspondiente
     * @param {Array} tablero
     * @param {Materia} materia
     */
    introducirMateriaDiaActual(tableroHorario, materia) {
        //***************Datos de la materia */
        let nombreMateria = materia.nombre;
        let diaMateria = materia.dia;
        //********************************** */
        if (this.hayCruce(tableroHorario, materia) === true) {
            //Si hay cruce no se mete
            return false;
        }

        for (let diaMatPos = 0; diaMatPos < diaMateria.length; diaMatPos++) {
            //*********************DATOS DEL DIA ACTUAL DE LA MATERIA */
            let diaActMat = diaMateria[diaMatPos].nombre;
            let horaInicio = diaMateria[diaMatPos].horaInicio;
            let horaFinal = diaMateria[diaMatPos].horaFinal;
            //******************************************************* */

            let posJdia = this.posicionDelDia(tableroHorario, diaActMat);

            for (let d = 1; d < tableroHorario.length; d++) {
                if (hora.dentroDelRango(hora.convertirADate(tableroHorario[d][0]), horaInicio, horaFinal)) {
                    tableroHorario[d][posJdia] = nombreMateria;
                }
            }
        }
        return true;
    }

    /**
     *
     * @param {Array} tableroHorario
     * @param {Materia} materia
     */
    hayCruce(tablero, materia) {

        let dias = materia.dia;
        for (let numDia = 0; numDia < dias.length; numDia++) {

            //***********DATOS DEL DIA ACTUAL*****************
            let nombreDia = dias[numDia].nombre;
            let horaInicio = dias[numDia].horaInicio;
            let horaFinal = dias[numDia].horaFinal;
            //************************************************

            //Comprobar que este dentro del rango del horario
            if (!hora.dentroDelRangoDelHorario(horaInicio, horaFinal, tablero)) {
                document.body.innerHTML += "La materia " + materia.nombre + " no se puede meter porque no esta dentro del rango " + tablero[1][0] + " - " + tablero[tablero.length - 1][0];
                return true;
            }

            //Comprobar que no se cruce con ninguna materia
            let posJdia = this.posicionDelDia(tablero, nombreDia);

            for (let d = 1; d < tablero.length; d++) {

                if (hora.dentroDelRango(hora.convertirADate(tablero[d][0]), horaInicio, horaFinal) &&
                    tablero[d][posJdia] !== '*') {
                    //document.body.innerHTML += "La materia " + materia.nombre + " se cruza con la materia " + tablero[d][posJdia] + " el dia " + nombreDia+"<br>";
                    return true;
                }
            }
        }
        return false;
    }

    /**
     *
     * @param {Array} tableroHorario
     * @param {string} dia
     */
    posicionDelDia(tableroHorario, diaActMat) {
        let pos = -1;
        for (let i = 0; i < tableroHorario[0].length; i++) {
            if (tableroHorario[0][i] == diaActMat) {
                pos = i;
                break;
            }
        }
        return pos;
    }

    /**
     * Metodo que imprime las materias que se han registrado actualmente
     *
     * @param materiasRegistradas
     */
    imprimirMateriasRegistradas(materiasRegistradas) {
        let result = "";
        for (let i = 0; i < materiasRegistradas.length; i++) { //Obtener el arrayList maestro

            for (let j = 0; j < materiasRegistradas[i].length; j++) { //Recorremos los array list internos

                result += materiasRegistradas[i][j].nombre + "<br>";

                for (let k = 0; k < materiasRegistradas[i][j].dia.length; k++) { //Recorremos los dias de la materia
                    result += "Dia " + materiasRegistradas[i][j].dia[k].nombre + "<br>";
                    result += "Hora inicio: " + materiasRegistradas[i][j].dia[k].horaInicio + "<br>";
                    result += "Hora final: " + materiasRegistradas[i][j].dia[k].horaFinal + "<br>";
                }

                result += "NRC: " + materiasRegistradas[i][j].nrc + "<br>";
                result += "-------------------------------------------------" + "<br>";
            }
        }
        document.getElementById("materias").innerHTML = result;
    }

    imprimirTableroIndividual(tablero) {
        let result = '';

        result += '<div class="container">';
        result += '<table class="table table-bordered table-light table-sm ">';


        for (let i = 0; i < tablero.length; i++) {
            for (let j = 0; j < tablero[i].length; j++) {
                if (i === 0 && j === 0) {result += '<thead class="text-white bg-dark">';}//inicio cabecera
                if( i === 1 && j === 0  ){result+=' <tbody>'; }//Inicio del tbody
                if(j === 0){result += '<tr>';}//al inicio de cada columna
                if(j === 0 && i>0){result += '<td class="table-danger">' + tablero[i][j] + '</td>';}
                else{result += '<td >' + tablero[i][j] + '</td>';}//para cada celda
                if( j === j == tablero[j].length - 1){result += '</tr>';}//al final de cada columna cerramos
                if( i === tablero.length-1 && j === tablero[i].length-1  ){result+=' </tbody>';}//Fin del body
                if (i === 0 && j === tablero[j].length - 1) {result += '</thead>'; }//fin cabecera
            }
        }
        result += '</table>';
        result += '</div>';
        document.getElementById("impresion").innerHTML += result;
    }


}