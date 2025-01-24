
CREATE DATABASE `FlowServer`;
USE `FlowServer`;

CREATE TABLE `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `token` VARCHAR(255) NOT NULL
);