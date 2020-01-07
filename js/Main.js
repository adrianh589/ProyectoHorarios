
        /************************ARQUITECTURA DE SOFTWARE********************************************/


        let arq2 = new Materia();
        arq2.nombre = "Arquitectura de software";
        arq2.dia.push(new Dia("lunes", h.leerHora(20,30), h.leerHora(21,59)));
        arq2.dia.push(new Dia("jueves", h.leerHora(18,15), h.leerHora(19,44)));
        arq2.nrc = "8213";
        op.guardarMateria(arq2);

        let arq3 = new Materia();
        arq3.nombre = "Arquitectura de software";
        arq3.dia.push(new Dia("miercoles", h.leerHora(20,30), h.leerHora(21,59)));
        arq3.dia.push(new Dia("viernes", h.leerHora(18,15), h.leerHora(19,44)));
        arq3.nrc = "8217";
        op.guardarMateria(arq3);

        let arq4 = new Materia();
        arq4.nombre = "Arquitectura de software";
        arq4.dia.push(new Dia("miercoles", h.leerHora(18,15), h.leerHora(19,44)));
        arq4.dia.push(new Dia("sabado", h.leerHora(20,30), h.leerHora(21,59)));
        arq4.nrc = "8213";
        op.guardarMateria(arq4);
        /*************************************************************************************************************/

        /**************************BASE DE DATOS MASIVAS***************************************************************/
        let basesMasivas = new Materia();
        basesMasivas.nombre = "Bases de datos masivas";
        basesMasivas.dia.push(new Dia("martes", h.leerHora(18,15), h.leerHora(19,44)));
        basesMasivas.dia.push(new Dia("sabado", h.leerHora(21,15), h.leerHora(21,59)));
        basesMasivas.nrc = "3468";
        op.guardarMateria(basesMasivas);

        let basesMasivas2 = new Materia();
        basesMasivas2.nombre = "Bases de datos masivas";
        basesMasivas2.dia.push(new Dia("martes", h.leerHora(20,30), h.leerHora(21,59)));
        basesMasivas2.dia.push(new Dia("viernes", h.leerHora(18,15), h.leerHora(19,44)));
        basesMasivas2.nrc = "13811";
        op.guardarMateria(basesMasivas2);
        /**************************************************************************************************************/

        /*****************************ECUACIONES DIFERENCIALES**********************************************************/
        let ecuaciones = new Materia();
        ecuaciones.nombre = "Ecuaciones diferenciales";
        ecuaciones.dia.push(new Dia("martes", h.leerHora(20,30), h.leerHora(21,59)));
        ecuaciones.dia.push(new Dia("viernes", h.leerHora(20,30), h.leerHora(21,59)));
        ecuaciones.nrc = "3906";
        op.guardarMateria(ecuaciones);
        /***************************************************************************************************************/

        /*****************************EDIS**********************************************************/
        let edis = new Materia();
        edis.nombre = "edi";
        edis.dia.push(new Dia("martes", h.leerHora(18,15), h.leerHora(19,44)));
        edis.dia.push(new Dia("jueves", h.leerHora(20,30), h.leerHora(21,59)));
        edis.nrc = "3463";
        op.guardarMateria(edis);
        /***************************************************************************************************************/

        //op.imprimirMateriasRegistradas(op.materiasRegistradas);
        //let tableroHorario = horario.tableroHorario([18, 0], [22, 45]);

        //op.generarHorarioAcademico(tableroHorario, 0, []);

        // guardarMateria(materia2);
        // guardarMateria(prueba);
        // guardarMateria(fisica);


