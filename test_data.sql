--
-- Create a database using `MYSQL_DATABASE` placeholder
--
CREATE DATABASE IF NOT EXISTS `MYSQL_DATABASE`;
USE `MYSQL_DATABASE`;

DROP TABLE IF EXISTS `Rooms`;
DROP TABLE IF EXISTS `Displays`;

CREATE TABLE `Displays` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`utc_updated` datetime DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
	`room_id` varchar(45) NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;


CREATE TABLE `Rooms` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`label` varchar(255),
	`utc_updated` datetime DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
	PRIMARY KEY (`id`),
	UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;

-- UNLOCK TABLES;

INSERT INTO `Displays` (`name`, `room_id`)
VALUES ('Test Display', '1'),
  ('Test Display 2', '1'),
  ('Test Display 3', '1');

INSERT INTO `Rooms` (`name`, `label`)
VALUES ('Test Room', 'Test Label'),
  ('No label room', NULL);