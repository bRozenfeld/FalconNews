DROP TABLE IF EXISTS news;
DROP TABLE IF EXISTS feeder;

CREATE TABLE feeder (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  url VARCHAR(255) NOT NULL UNIQUE
) ENGINE = InnoDB;

CREATE TABLE news (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  published_date DATETIME NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  url VARCHAR(255) NOT NULL,
  feeder_id INT,
  is_displayed BOOLEAN NOT NULL DEFAULT false,
  priority INT NOT NULL DEFAULT 20,
  CONSTRAINT fk_feeder
  FOREIGN KEY (feeder_id) REFERENCES feeder(id)
) ENGINE = InnoDB;
