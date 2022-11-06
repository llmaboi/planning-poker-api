import { z } from 'zod';

export const ZodDisplayRaw = z.object({
  id: z.number(),
  room_id: z.number(),
  name: z.string().min(1),
});

export const ZodDisplay = z.object({
  id: z.number(),
  roomId: z.number(),
  name: z.string().min(1),
});

// CREATE TABLE `Displays` (
// 	`id` int NOT NULL AUTO_INCREMENT,
// 	`name` varchar(255) NOT NULL,
// 	`utc_updated` datetime DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
// 	`room_id` varchar(45) NOT NULL,
// 	PRIMARY KEY (`id`),
// 	UNIQUE KEY `id_UNIQUE` (`id`)
// ) ENGINE InnoDB,
//   CHARSET utf8mb4,
//   COLLATE utf8mb4_0900_ai_ci;
