%% 
% los maestros imparten 1 o mas clases
% los maestros imparten 1 o mas materias
% Los maestros imparten 1 o mas turnos
% Los maestros no pueden impartir 2 clases al mismo tiempo
% Las clases no pueden finalizar despues del tiempo establecido
% Las clases no pueden iniciarce antes del tiempo establecido
use_module(library(odbc)).


conexion(bd) :- odbc_connect('horarios_escolares', _, [user('root'), password('110211'), alias(bd), open(once)]). 

dias([1,2,3,4,5]).

maestros(Maestros) :-
    conexion(bd),
    findall(
        X,
        odbc_query(bd , 'SELECT (id) FROM maestro', row(X)),        
        Maestros
    ).

materias(Materias) :-
    conexion(bd),
    findall(
        X,
        odbc_query(bd , 'SELECT (id) FROM materia', row(X)),        
        Materias
    ).

grupos(Grupos) :-
    conexion(bd),
    findall(
        X,
        odbc_query(bd , 'SELECT (id) FROM grupo', row(X)),        
        Grupos
    ).

clases(Clases) :-
    conexion(bd),
    findall(
        X,
        odbc_query(bd , 'SELECT (id) FROM clase', row(X)),        
        Clases
    ).

selecciones(Seleccion) :-
    conexion(bd),
    findall(
        X,
        odbc_query(bd , 'SELECT (id) FROM seleccione', row(X)),        
        Selecciones
    ).

turnos(Turnos) :-
    conexion(bd),
    findall(
        X,
        odbc_query(bd , 'SELECT (id) FROM turno', row(X)),        
        Turnos
    ).

imparte(maestros, materias).
imparte(maestros, grupos).
imparte(maestros, truno).

pertenece(grupos, turnos).
pertenece(grupos, horario).
pertenece(grupo, maestro).
pertenece(materias, horario).
pertenece(materia, grupos).
horario(inicio, fin).

maestro(clase, materia).
turno(maestros).
duracion(clases, horas).
grupo(turno).
grupo(alumnos).
grupo(materias,horarios).
trabaja(maestros, dia).
clase(clases, dia).

buscarMaestros(Prioridades) :-
    maestros(Maestros),
    buscarMaestros(Prioridades, Maestros).

buscarMaestros([], Maestros).
buscarMaestros([Maestro | Sig], Maestros) :- 
    member(Maestro, Maestros), !, buscarMaestros(Sig, Maestros).

existeTurno(Turno) :- turnos(Turnos), member(Turno, Turnos).
existeGrupo(Grupo) :- grupos(Grupos), member(Grupo, Grupos).



%Toma selecciones del maestro
%Toma seleccion por seleccion del maestro
%Le asigna una hora al maestro
%Verifica que no se sobreponga a una hora ya determinada
% -- Si ya hay hora determinada 
%Varia su hora en base a variacion
% -- Si todas las horas de un dia estan llenas
%Varia su dia en base a variacion
% Horario horneado :D

turnoInfo(Turno, TurnoInfo) :- 
    conexion(bd),
    atom_concat(
        'SELECT * from turno WHERE id=', 
        Turno, QTurno),
        odbc_query(bd , QTurno, row(Id, Nombre, HoraInicio, HoraFin),
        [ types( [default, default, default, default] ) ]),
        TurnoInfo={id:Id, nombre:Nombre, hora_inicio:HoraInicio, hora_fin:HoraFin}.  



%ASIGNAR HORAS

valido(Horas, Dias, Hora, HoraIncio, HoraFin, Dia):-
    not(member(Hora, Horas)).

valido(Horas, Dias, Hora, HoraIncio, HoraFin, Dia) :-
    Hora >= HoraInicio, Hora =< HoraFin.

valido(Horas, Dias, Hora, HoraIncio, HoraFin, Dia):-
    dias(X), member(Dia, X).

valido(Horas, Dias, Hora, HoraIncio, HoraFin, Dia):-
    not(member(Dia, Dias)).

restarHoras(Hora, Horas,Dia, Dias, HoraInicio, HoraFin, RetHora, RetDia):-
    member(Hora, Horas) -> X is Hora - 1, X >= HoraInicio, RetHora is X, restarHoras(RetHora, Horas, HoraInicio, RetHora).

sumarHoras(Hora, Horas,Dia, Dias, HoraInicio, HoraFin, RetHora, RetDia):-
    member(Hora, Horas) -> X is Hora - 1, X >= HoraInicio, RetHora is X, sumarHoras(RetHora, Horas, HoraInicio, RetHora).
     
asignarClase(Seleccion, Horas, Dias, NuevaClase, Turno):-
    member(Seleccion.hora, Horas).

asignarHoras([Actual | Selecciones], HorarioFinal, Turno):-
    append([], [{hora: Actual.hora, dia: Actual.dia, maestro: Actual.maestro, materia: Actual.materia}], HorarioInicial),
    asignarHoras(Selecciones, HorarioInicial, HorarioFinal, Turno).

asignarHoras([], HorarioInicial, HorarioFinal, Turno) :- 
    HorarioFinal = HorarioInicial.

asignarHoras([Seleccion | Sig], HorarioInicial, HorarioFinal, Turno) :- 
    asignarClase(Seleccion, Horas ,Dias, NuevaClase, Turno), 
    append(HorarioInicial, [{hora: NuevaClase.hora, dia: NuevaClase.dia, maestro: Seleccion.maestro, materia: Seleccion.materia}], HorarioFinal), !,
    asignarHoras(Sig, HorarioFinal, HorarioFinal, Turno).



%SELECCIONES MAESTROS
seleccionesMaestro(Maestro, Selecciones) :- 
    conexion(bd),
    atom_concat(
        'SELECT s.id, s.maestroId, s.materiaId, s.dia, s.hora, mas.nombre, mat.nombre FROM seleccion AS s LEFT JOIN materia AS mat ON mat.id = s.materiaId LEFT JOIN maestro AS mas ON mas.id = s.maestroId WHERE s.maestroId=', 
        Maestro, QMaestro),
    findall(
        {id:Id, maestroId:MaestroId, materiaId:MateriaId, dia:Dia, hora:Hora, maestro:MasNombre, materia:MatNombre},
        odbc_query(bd , QMaestro, row(Id, MaestroId, MateriaId, Dia, Hora, MasNombre,  MatNombre),
        [ types( [default, default, default, default, default, default, default] ) ]),
        Selecciones
    ).
    
seleccionesMaestros([Maestro | Sig],Selecciones):-
    seleccionesMaestro(Maestro, Sx),
    append([], Sx, Inicial),
    seleccionesMaestros(Sig, Inicial, Selecciones).

seleccionesMaestros([], Inicial, Ret):- Ret=Inicial.
seleccionesMaestros([Maestro | Sig], Inicial, Ret) :- 
    seleccionesMaestro(Maestro, Selecciones), append(Inicial, Selecciones, Ret),!, 
    seleccionesMaestros(Sig, Ret, Ret).
 
%HORARIO
crearHorario(Prioridades, Turno, Grupo, Horario) :- 
    buscarMaestros(Prioridades).
    existeTurno(Turno),
    turnoInfo(Turno, TurnoInfo),
    existeGrupo(Grupo),
    seleccionesMaestros(Prioridades,Selecciones),
    asignarHoras(Selecciones, Horario, TurnoInfo).