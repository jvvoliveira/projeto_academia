create table Academia(
	id serial primary key,
	nome varchar(50) not null
)

create table Pessoa(
	id serial primary key,
	nome varchar(50) not null,
	email varchar(30) not null unique,
	academia_id integer not null,
	foreign key (academia_id) references Academia (id)
)

create table Instrutor(
	registro varchar(10) not null unique
)inherits(Pessoa)

create table Modalidade(
	id serial primary key,
	nome varchar(20) not null unique
)

create table Exercicio(
	id serial primary key,
	nome varchar(20) not null unique,
	modalidade_id integer not null,
	foreign key (modalidade_id) references Modalidade (id)
)

create table Treino(
	id serial primary key,
	aluno_id integer,
	instrutor_registro varchar(10),	
	nome varchar(20) not null,
	realizacoes integer default 0,
	foreign key (aluno_id) references Pessoa (id),
	foreign key (instrutor_registro) references Instrutor (registro)
)

create table Treino_Exercicio(
	id serial primary key,
	exercicio_id integer,
	treino_id integer,
	series integer not null default 3,
	repeticoes integer not null default 10, 
	descanso integer not null default 1, 
	foreign key (exercicio_id) references Exercicio (id), 
	foreign key (treino_id) references Treino (id)
)