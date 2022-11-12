import { z } from 'zod';
import { ZodRoomRaw } from './room.zod';

export type Room = z.infer<typeof ZodRoomRaw>;
