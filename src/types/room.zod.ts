import { z } from 'zod';

export const ZodRoomRaw = z.object({
  id: z.number(),
  label: z.string().nullable(),
  name: z.string().min(1),
});
