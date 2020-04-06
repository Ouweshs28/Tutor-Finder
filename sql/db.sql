DROP DATABASE twd;
CREATE DATABASE twd;
USE twd;

CREATE TABLE Tutor(
	tutorID int NOT NULL AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL,
	username VARCHAR(10) NOT NULL,
	email VARCHAR(50) NOT NULL,
	password VARCHAR (50) NOT NULL,
	address VARCHAR(50) NOT NULL,
	region ENUM('NORTH','SOUTH','CENTER','EAST','WEST') NOT NULL,
	grade VARCHAR(50) NOT NULL,
	subject VARCHAR (100) NOT NULL,
	phonenum VARCHAR (20) NOT NULL,
	PRIMARY KEY (tutorID)
);

CREATE TABLE Student(
	username VARCHAR(15) NOT NULL,
	email VARCHAR(50) NOT NULL,
    password VARCHAR (50) NOT NULL,
	PRIMARY KEY (username)
);

CREATE TABLE Review(
    username VARCHAR(15) NOT NULL,
	tutorID int NOT NULL,
	rating ENUM('Not recommended','Average','Good','Excellent') NOT NULL,
	comment VARCHAR (100),
	PRIMARY KEY (username,tutorID),
	FOREIGN KEY (username) REFERENCES Student(username),
	FOREIGN KEY(tutorID) REFERENCES  Tutor(tutorID)
);


INSERT INTO Tutor (name, username, email, password, address, region, grade, subject, phonenum)
VALUES ('Ouwesh Seeroo','ouweshs28','ouweshseeroo@gmail.com','os2801','Royal Road Bon Acceuil','EAST','12-13','Computer Science','+23057817861'),
('Betul Kara','btrxxx','betulkara@gmail.com','bk2011','Fic-en Flacq','WEST','7-9','Turkish','+230512345678'),
('Zaffar Fakeer','zaffarfakeer','zafarfakeer@gmail.com','zaffar','Port Louis','WEST','12-13','Mathematics','+23057817817'),
('Aaliyah','aaliyah','aaliyah@gmail.com','aaliyah','Grand Baie','NORTH','7-9','Computer Science, Mathematics','+23057305861'),
('Vishal Molayee','vmolayee','vmolayee@gmail.com','maths','Phoenix','CENTER','10-11','Mathematics, Additional Mathematics','+23057867861'),
('Noorjahan ','conayee','nconayee@gmail.com','languages','Souliac','SOUTH','10-11','English Language, French Language','+2305676771');


INSERT INTO Student VALUES ('ouweshs28','ouweshseeroo@gmail.com','os2801'),
('yelina','yelina@gmail.com','yelina'),
('sooraya','sooraya@gmail.com','s1234'),
('farhaan','farhaanb@gmail.com','fb1234');

INSERT INTO Review VALUES ('ouweshs28',2,'Good','She is a very friendly and encouraging teacher'),
('sooraya',1,'Excellent','Amazing teacher'),
('yelina',1,'Excellent','Amazing support'),
('ouweshs28',3,'Excellent','Amazing support'),
('ouweshs28',4,'Good','Good Support');
