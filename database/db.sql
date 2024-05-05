CREATE DATABASE users;

USE users;
CREATE TABLE Jugadores (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    fechaNacimiento VARCHAR(50),
    genero VARCHAR(10),
    estado VARCHAR(50),
    email VARCHAR(100)
);

USE users;
CREATE TABLE Juegos (
    id INT IDENTITY(1,1) PRIMARY KEY,
    jugador_id INT,
    fechaHoraInicio VARCHAR(50),
    fechaHoraFin VARCHAR(50),
    tipoFinanciamiento VARCHAR(50),
    noEstaciones INT,
    noContratos INT,
    balance INT,
    qytTrabajador INT,
    qytHerramienta INT,
    qytSemilla INT,
    qytAgua INT,
    qytFertilizante INT,
    FOREIGN KEY (jugador_id) REFERENCES Jugadores(id)
);
USE users;
CREATE TABLE Parcelas (
    id INT IDENTITY(1,1) PRIMARY KEY,
    juego_id INT,
    numeroParcela INT,
    qytTrabajadorPar INT,
    qytHerramientaPar INT,
    qytSemillaPar INT,
    qytAguaPar INT,
    qytFertilizantePar INT,
    desbloqueada VARCHAR(50),
    productividad INT,
    FOREIGN KEY (juego_id) REFERENCES Juegos(id)
);

USE users
CREATE TABLE Resultados (
    
    id INT IDENTITY(1,1) PRIMARY KEY,
    
    email VARCHAR(100)
)
USE users;
CREATE TABLE Preguntas (
    id INT IDENTITY(1,1) PRIMARY KEY,
    juego_id INT,
    pregunta VARCHAR(50),
    respuesta VARCHAR(200),
    correcta VARCHAR(50),
    FOREIGN KEY (juego_id) REFERENCES Juegos(id)
);
