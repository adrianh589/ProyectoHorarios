let h = new Hora();
let op = new OperacionesMateria();
let horario = new Horario();

//ID para identificar las cartas de las materias
let materiaID = 0;

//Variable para guardar los IDS de las cartas
let IDS = [];

/**
 * Funcion para agregar una nueva tarjeta de materia
 */
function agregarMateria() {
    IDS.push(materiaID);
    var div = document.createElement('div');
    div.innerHTML =
        `<div class="card ` + colorAleatorio() + `" id="cuadro${materiaID}" style="width: 25rem;">
    <div class="card-body">
        <button type="button" class="close" aria-label="Close" onclick="eliminarMateria(${materiaID})">
            <span aria-hidden="true">&times;</span>
        </button>

        <!-- Nombre de la materia -->
        <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">Materia:</span>
            </div>
            <input type="text" class="form-control" value="` + capturarNA(materiaID) + `" id="textoMateria${materiaID}" placeholder="Nombre de la materia" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
        </div>

        <!-- Dia 1 de la materia -->
        <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">Dia 1</label>
            </div>
            <select class="custom-select" id="dia1${materiaID}" required>
                <option selected value="">--Seleccione--</option>
                <option value="lunes">Lunes</option>
                <option value="martes">Martes</option>
                <option value="miercoles">Miercoles</option>
                <option value="jueves">Jueves</option>
                <option value="viernes">Viernes</option>
                <option value="sabado">Sabado</option>
                <option value="domingo">Virtual</option>
            </select>
        </div>

        <!-- Hora de inicio y hora final -->
        <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">Inicio</label>
            </div>
            <input type="time" id="horaInicioDia1${materiaID}" name="appt">
            <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">Final</label>
            </div>
            <input type="time" id="horaFinalDia1${materiaID}" name="appt" required>
        </div>

        <!-- Dia 2 de la materia -->
        <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">Dia 2</label>
            </div>
            <select class="custom-select" id="dia2${materiaID}">
                <option selected value="">--Seleccione--</option>
                <option value="lunes">Lunes</option>
                <option value="martes">Martes</option>
                <option value="miercoles">Miercoles</option>
                <option value="jueves">Jueves</option>
                <option value="viernes">Viernes</option>
                <option value="sabado">Sabado</option>
                <option value="virtual">Virtual</option>
            </select>
        </div>

        <!-- Hora de inicio y hora final -->
        <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">Inicio</label>
            </div>
            <input type="time" id="horaInicioDia2${materiaID}" name="appt" required>
            <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">Final</label>
            </div>
            <input type="time" id="horaFinalDia2${materiaID}" name="appt" required>
        </div>


        <!-- NRC de la materia -->
        <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">NRC</span>
            </div>
            <input type="text" class="form-control" id="nrc${materiaID}" placeholder="NRC de la materia" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" required>
        </div>


    </div>
</div>`;
    document.getElementById('tarjetas').appendChild(div);
    materiaID++;
}

/**
 * Funcion para capturar el nombre de la materia anterior de la tarjeta
 * @param id
 * @returns {string|*}
 */
function capturarNA(id) {
    try {
        for (let i = 0; i < IDS.length; i++) {
            if (IDS[i] == id) {
                return document.getElementById("textoMateria" + IDS[i - 1]).value;
            }
        }
    } catch (e) {
        return "";
    }
}

/**
 * Funcion que crea un color aleatorio para las tarjetas
 * @returns {string}
 */
function colorAleatorio() {
    let result = "";
    let colorAleatorio = Math.floor((Math.random() * 8) + 0);

    switch (colorAleatorio) {
        case 0:
            result += "bg-primary text-white";
            break;
        case 1:
            result += "bg-secondary text-white";
            break;
        case 2:
            result += "bg-success text-white";
            break;
        case 3:
            result += "bg-danger text-white";
            break;
        case 4:
            result += "bg-warning text-dark";
            break;
        case 5:
            result += "bg-info text-white";
            break;
        case 6:
            result += "bg-light text-dark";
            break;
        case 7:
            result += "bg-dark text-white";
            break;
        case 8:
            result += "bg-dark text-white";
            break;
    }
    return result;
}

/**
 * Funcion para eliminar una tarjeta especifica
 * @param id
 */
function eliminarMateria(id) {
    for (let i = 0; i < IDS.length; i++) {//Tambien se borra del array de IDS
        if (IDS[i] == id) {
            IDS.splice(i, 1);
        }
    }
    document.getElementById("cuadro" + id).remove();
}

/**
 * funcion que recorre tarjeta por tarjeta, crreando una nueva materia por cada una de ellas
 */
function inscribirMaterias() {
    op.materiasRegistradas = [];//Borramos las materias que ya tenia
    document.getElementById('impresion').innerHTML = "";//Se elimina los horarios que ya ha generado para evitar ver el mismo horario
    let bandera = validarCampos();
    if (bandera == true) {//Verificar que se hayan llenado los campos requeridos
        let horaInicioHorario = "";
        let horaFinalHorario = "";
        let filtroMaterias = parseInt(document.getElementById('filtro').value);
        //Creacion de la materia****************************************************************************************
        for (let i = 0; i < IDS.length; i++) {
            let materia = new Materia();
            materia.nombre = document.getElementById("textoMateria" + IDS[i]).value;

            let nombreDiaM = document.getElementById("dia1" + IDS[i]).value;
            let horaInicioDia1 = document.getElementById("horaInicioDia1" + IDS[i]).value;

            horaInicioHorario = hora.retornarHoraInicioHorario(horaInicioDia1, horaInicioHorario);//Verificar que sea la hora menor

            let horaFinalDia1 = document.getElementById("horaFinalDia1" + IDS[i]).value;

            horaFinalHorario = hora.retornarHoraFinalHorario(horaFinalDia1, horaFinalHorario);//Verificar que sea la hora mayor

            materia.dia.push(new Dia(nombreDiaM, h.convertirADate(horaInicioDia1), h.convertirADate(horaFinalDia1)));


            let nombreDiaM2 = document.getElementById("dia2" + IDS[i]).value;

                let horaInicioDia2 = document.getElementById("horaInicioDia2" + IDS[i]).value;

                horaInicioHorario = hora.retornarHoraInicioHorario(horaInicioDia2, horaInicioHorario);//Verificar que sea la hora menor

                let horaFinalDia2 = document.getElementById("horaFinalDia2" + IDS[i]).value;

                horaFinalHorario = hora.retornarHoraFinalHorario(horaFinalDia2, horaFinalHorario);//Verificar que sea la hora mayor

                materia.dia.push(new Dia(nombreDiaM2, h.convertirADate(horaInicioDia2), h.convertirADate(horaFinalDia2)));


            materia.nrc = document.getElementById("nrc" + IDS[i]).value;
            op.guardarMateria(materia);

            //op.imprimirMateriasRegistradas(op.materiasRegistradas);***************************************************
        }

        //Generacion del tablero academico
        let tableroHorarioF = horario.tableroHorario(hora.convertirAarray(horaInicioHorario), hora.convertirAarray(horaFinalHorario));
        //Generar horario academico
        op.generarHorarioAcademico(tableroHorarioF, 0, [], filtroMaterias);
    }
}


/**
 * Funcion que valida que los campos esten correctamente
 * @returns {boolean}
 */
function validarCampos() {
    for (let i = 0; i < IDS.length; i++) {
        let name = document.getElementById("textoMateria" + IDS[i]).value;
        let nombreDia1 = document.getElementById("dia1" + IDS[i]).value;
        let horaInicioDia1 = document.getElementById("horaInicioDia1" + IDS[i]).value;
        let horaFinalDia1 = document.getElementById("horaFinalDia1" + IDS[i]).value;
        let nombreDia2 = document.getElementById("dia2" + IDS[i]).value;
        let horaInicioDia2 = document.getElementById("horaInicioDia2" + IDS[i]).value;
        let horaFinalDia2 = document.getElementById("horaFinalDia2" + IDS[i]).value;
        let nrc = document.getElementById("nrc" + IDS[i]).value;


            if (name == "") {
                alert('Falta llenar el nombre de la materia en la tarjeta ' + (i + 1));
                return false;
            }

            if (nombreDia1 == "") {
                alert('Falta llenar el dia en la tarjeta ' + (i + 1));
                return false;
            }

            if (horaInicioDia1 == "") {
                alert('Falta llenar la hora de inicio del dia '+nombreDia1+' en la tarjeta ' + (i + 1));
                return false;
            }

            if(horaFinalDia1 ==""){
                alert('Falta llenar la hora final del dia '+nombreDia1+' en la tarjeta ' + (i + 1));
                return false;
            }

            if(hora.convertirADate(horaInicioDia1) > hora.convertirADate(horaFinalDia1)){
                alert('La hora inicial del dia '+nombreDia1+' no puede ser inferior que la hora final en la tarjeta '+(i+1))
            }

            if(nombreDia2 != ""){
                if(horaInicioDia2 == "" || horaFinalDia2 == ""){
                    alert("falta ingresar horas del dia "+nombreDia2+" en la tarjeta "+ (i+1));
                    return false;
                }

                else if(hora.convertirADate(horaInicioDia2) > hora.convertirADate(horaFinalDia2)){
                    alert('La hora inicial del dia '+nombreDia2+' no puede ser inferior que la hora final en la tarjeta '+(i+1))
                }
            }

            if(nrc == ""){
                alert("falta llenar el nrc en la tarjeta "+ (i+1));
                return false;
            }

    }
    return true;
}