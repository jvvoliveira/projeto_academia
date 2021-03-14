INSERT INTO Academia (nome) VALUES ('HI');
INSERT INTO Academia (nome) VALUES ('Match Fit');

INSERT INTO Pessoa (nome, email, academia_id) VALUES ('João Victor', 'jvv@email.com', 1);
INSERT INTO Pessoa (nome, email, academia_id) VALUES ('Natacha', 'nat@email.com', 2);

INSERT INTO Instrutor (nome, email, registro, academia_id) VALUES ('Rodrigo', 'rod_personal@email.com', '456def', 1);
INSERT INTO Instrutor (nome, email, registro, academia_id) VALUES ('Caio Henrique', 'caio_personal@email.com', '123456abc', 2);

insert into Treino (aluno_id, instrutor_registro, nome, realizacoes) values (1, '456def', 'A Intermediário', 2);
insert into Treino (aluno_id, instrutor_registro, nome) values (2, '123456abc', 'C Iniciante');

insert into Modalidade (nome) values ('Peito');
insert into Modalidade (nome) values ('Costas');
insert into Modalidade (nome) values ('Tríceps');
insert into Modalidade (nome) values ('Bíceps');
insert into Modalidade (nome) values ('Abdômen');
insert into Modalidade (nome) values ('Coxa');
insert into Modalidade (nome) values ('Panturrilha');
insert into Modalidade (nome) values ('Ombro');

insert into exercicio (nome, modalidade_id) values ('Supino Reto', 1);
insert into exercicio (nome, modalidade_id) values ('Supino Inclinado', 1);
insert into exercicio (nome, modalidade_id) values ('Puxada Neutra', 2);
insert into exercicio (nome, modalidade_id) values ('Remada Baixa', 2);
insert into exercicio (nome, modalidade_id) values ('Remada Alta', 2);
insert into exercicio (nome, modalidade_id) values ('Tríceps Corda', 3);
insert into exercicio (nome, modalidade_id) values ('Tríceps Francês', 3);
insert into exercicio (nome, modalidade_id) values ('Rosca Scott', 4);
insert into exercicio (nome, modalidade_id) values ('Rosca Martelo', 4);
insert into exercicio (nome, modalidade_id) values ('Rosca Alternada', 4);
insert into exercicio (nome, modalidade_id) values ('Abdominal', 5);
insert into exercicio (nome, modalidade_id) values ('Abdominal Infra', 5);
insert into exercicio (nome, modalidade_id) values ('Agachamento Smith', 6);
insert into exercicio (nome, modalidade_id) values ('Leg Press', 6);
insert into exercicio (nome, modalidade_id) values ('Agachamento Sumô', 6);
insert into exercicio (nome, modalidade_id) values ('Extensora', 6);
insert into exercicio (nome, modalidade_id) values ('Abdutora', 6);
insert into exercicio (nome, modalidade_id) values ('Sentadilha', 7);
insert into exercicio (nome, modalidade_id) values ('Elevação Lateral', 8);
insert into exercicio (nome, modalidade_id) values ('Encolhimento Ombro', 8);

insert into treino_exercicio (treino_id, exercicio_id, series, repeticoes, descanso) values (1, 1, 3, 10, 1);
insert into treino_exercicio (treino_id, exercicio_id, series, repeticoes, descanso) values (1, 2, 3, 10, 1);
insert into treino_exercicio (treino_id, exercicio_id, series, repeticoes, descanso) values (1, 6, 3, 10, 1);
insert into treino_exercicio (treino_id, exercicio_id, series, repeticoes, descanso) values (1, 7, 3, 10, 1);
insert into treino_exercicio (treino_id, exercicio_id, series, repeticoes, descanso) values (1, 18, 3, 12, 1);
insert into treino_exercicio (treino_id, exercicio_id, series, repeticoes, descanso) values (1, 12, 3, 20, 1);

insert into treino_exercicio (treino_id, exercicio_id, series, repeticoes, descanso) values (2, 13, 3, 10, 1);
insert into treino_exercicio (treino_id, exercicio_id, series, repeticoes, descanso) values (2, 14, 3, 10, 1);
insert into treino_exercicio (treino_id, exercicio_id, series, repeticoes, descanso) values (2, 15, 3, 10, 1);
insert into treino_exercicio (treino_id, exercicio_id, series, repeticoes, descanso) values (2, 16, 3, 10, 1);
insert into treino_exercicio (treino_id, exercicio_id, series, repeticoes, descanso) values (2, 11, 3, 10, 1);
