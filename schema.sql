DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Metallica: Ride The Lightning LP", "Music Media", 22.95, 15),
("Super Troopers DVD", "Video Media", 9.95, 7),
("Ray Ban Wayfarer Classic", "Sunglasses", 149.95, 10),
("Pendleton Flannel Shirt", "Apparel", 69.95, 5),
("Mr Pibb", "Grocery", 1.99, 200),
("Count Chocula", "Grocery", 3.99, 42),
("Dill Scallions DVD", "Video Media", 11.75, 12),
("Levi's 501 Big E 30x30", "Apparel", 600, 36),
("Fender Stratocaster MIJ", "Musical Instruments", 900, 3),
("Gibson Maestro Fuzz Pedal RI", "Musical Instruments", 299.99, 17),
("Velcro Strips", "Household", 4.90, 300),
("Harry Potter the Book", "Book Media", 22.95, 700);