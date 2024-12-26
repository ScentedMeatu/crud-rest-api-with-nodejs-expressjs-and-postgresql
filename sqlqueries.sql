CREATE TABLE public.students (
    id serial NOT NULL,
    firstname varchar(40) NULL,
    lastname varchar(40) NULL,
    origin varchar(50) NULL,
    CONSTRAINT students_pkey PRIMARY KEY (id)
);

SELECT * FROM students;