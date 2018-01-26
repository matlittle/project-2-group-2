DROP DATABASE IF EXISTS baggage_db;

CREATE DATABASE baggage_db;

USE baggage_db;

CREATE TABLE questions (
  id INT AUTO_INCREMENT,
  question VARCHAR(300) NOT NULL,
  field INT(1),
  threshold INT(2),
  PRIMARY KEY(id)
);

CREATE TABLE specialties (
  spec_id INT AUTO_INCREMENT,
  spec_name VARCHAR(50),
  PRIMARY KEY (spec_id)
);

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(254) NOT NULL,
    password VARCHAR(254) NOT NULL,
    field1 INT(2) DEFAULT 0,
    field2 INT(2) DEFAULT 0,
    field3 INT(2) DEFAULT 0,
    field4 INT(2) DEFAULT 0,
    survey_state INT(2) DEFAULT 0,
    PRIMARY KEY (id)
);

