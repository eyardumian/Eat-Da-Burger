CREATE DATABASE burger_db;
USE burger_db;

CREATE TABLE orders
(
  id int NOT NULL AUTO_INCREMENT,
  hamburgerorder VARCHAR(100) NOT NULL,
  devoured BOOLEAN DEFAULT false,
  PRIMARY KEY(id)
);

INSERT INTO orders (hamburgerorder);
VALUES ("cheeseburger without onions"),
        ("hamburger with bacon");
