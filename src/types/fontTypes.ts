import { z } from 'zod';
import { FontSchema } from '../schemas/fontSchemas';

export type Font = z.infer<typeof FontSchema>;
