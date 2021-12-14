%% 
% los maestros imparten 1 o mas clases
% los maestros imparten 1 o mas materias
% Los maestros imparten 1 o mas turnos
% Los maestros no pueden impartir 2 clases al mismo tiempo
% Las clases no pueden finalizar despues del tiempo establecido
% Las clases no pueden iniciarce antes del tiempo establecido
use_module(library(odbc)).


conexion(bd) :- odbc_connect('horarios_escolares', _, [user('root'), password('110211'), alias(bd), open(once)]). 

hora_minima('00:00:00').
hora_maxima('24:00:00').
dias_semana(['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']).

maestros(Maestros) :-
    conexion(bd),
    findall(
        X,
        odbc_query(bd , 'SELECT (id) FROM maestros', row(X)),        
        Maestros
    ).

materias(Materias) :-
    conexion(bd),
    findall(
        X,
        odbc_query(bd , 'SELECT (id) FROM materias', row(X)),        
        Materias
    ).

grupos(Grupos) :-
    conexion(bd),
    findall(
        X,
        odbc_query(bd , 'SELECT (id) FROM grupos', row(X)),        
        Grupos
    ).

clases(Clases) :- 
    conexion(bd),
    findall(
        X,
        odbc_query(bd , 'SELECT (id) FROM clases', row(X)),        
        Clases
    ).

turnos(Turnos) :-
    conexion(bd),
    findall(
        X,
        odbc_query(bd , 'SELECT (id) FROM turnos', row(X)),        
        Turnos
    ).



% maestros(Maestro, ID) :- 
%     odbc_connect('horarios_escolares', _, [user('root'), password('110211'), alias(bd), open(once)]),
%     odbc_prepare(
%         bd, 
%         'SELECT (nombre) FROM maestros WHERE id = ?', 
%         [default],
%         Statement,
%         [fetch(fetch)]),
%     odbc_execute(Statement, [ID]),
%     odbc_fetch(Statement, row(Maestro), []).

