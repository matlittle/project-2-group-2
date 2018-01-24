DROP DATABASE IF EXISTS baggage_db;

CREATE DATABASE baggage_db;

USE baggage_db;

CREATE TABLE questions (
  id INT AUTO_INCREMENT,
  question VARCHAR(200) NOT NULL,
  spec1 INT(2),
  spec1_wgt INT(3),
  spec2 INT(2),
  spec2_wgt INT(3),
  spec3 INT(2),
  spec3_wgt INT(3),
  PRIMARY KEY(id)
);

CREATE TABLE specialties (
  spec_id INT AUTO_INCREMENT,
  spec_name VARCHAR(100),
  spec_active BOOLEAN DEFAULT TRUE,
  PRIMARY KEY (spec_id)
);

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(254) NOT NULL,
    password VARCHAR(254) NOT NULL,
    PRIMARY KEY (id)
);

