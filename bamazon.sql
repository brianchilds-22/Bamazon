DROP DATABASE if EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL(10,4) NOT NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY (id)
); 

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gibson SG Special", "Electric Guitars", 799, 20), 
("Fender Telecaster", "Electric Guitars", 674.99, 12),
("Ibanez", "Bass Guitars", 279.99, 15), 
("Ludwig LC 175", "Drums", 399, 5),
("Drum Workshop 3002", "Drum Hardware", 269.99, 30), 
("Mackie Thump 12A", "Speakers", 299.99, 10),
("Behringer X32", "Mixers", 999.99, 3), 
("Shure SM58", "Microphones", 99, 8),
("Yamaha MODX8", "Keyboards", 1800, 4), 
("Hot Wires", "Cables", 15, 50);

SELECT * FROM bamazon.products;