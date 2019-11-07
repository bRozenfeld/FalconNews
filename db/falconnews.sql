DROP TABLE IF EXISTS news;
DROP TABLE IF EXISTS feeder;
DROP TABLE IF EXISTS user;

CREATE TABLE feeder (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  url VARCHAR(255) NOT NULL UNIQUE
) ENGINE = InnoDB;

CREATE TABLE news (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  published_date DATETIME NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  url VARCHAR(255) NOT NULL UNIQUE,
  url_img VARCHAR(255) NOT NULL,
  feeder_id INT,
  is_displayed BOOLEAN NOT NULL DEFAULT false,
  priority INT NOT NULL DEFAULT 20,
  CONSTRAINT fk_feeder
  FOREIGN KEY (feeder_id) REFERENCES feeder(id) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE user (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT false
) ENGINE = InnoDB;
