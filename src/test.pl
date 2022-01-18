grupos([1,2,3,4,5]).

buscarGrupos([]).
buscarGrupos([Item | Sig]):- grupos(Grupos), member(Item,Grupos), buscarGrupos(Sig).

conexion(bd) :- odbc_connect('horarios_escolares', _, [user('root'), password('110211'), alias(bd), open(once)]). 

pepe(X) :- X=s{n:1, r:2}.

data([s{a:1,b:2},s{a:3,b:5}]).

test(X):-
%    insert_child(Child, Mother, Father, Affected) :-
%       odbc_query(parents,
%                   'INSERT INTO parents (name,mother,father) \
%                      VALUES (\'mary\', \'christine\', \'bob\')',
%                   affected(Affected)).
