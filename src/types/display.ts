import { z } from 'zod';
import { ZodDisplay, ZodDisplayRaw } from './display.zod';

export type DisplayRaw = z.infer<typeof ZodDisplayRaw>;
export type Display = z.infer<typeof ZodDisplay>;
