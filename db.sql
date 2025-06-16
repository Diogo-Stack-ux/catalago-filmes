-- public.filmes definição

-- Drop table

-- DROP TABLE public.filmes;

CREATE TABLE public.filmes (
	id serial4 NOT NULL,
	nome text NOT NULL,
	descricao text NULL,
	genero text NOT NULL,
	ano int4 NOT NULL,
	nota numeric(3, 1) NULL,
	CONSTRAINT filmes_pkey PRIMARY KEY (id)
);
