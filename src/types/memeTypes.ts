import { z } from 'zod';
import { CreateMemeParamsSchema, CreateMemeResponseSchema, MemeSchema } from '../schemas/memeSchemas';

export type Meme = z.infer<typeof MemeSchema>;

export type CreateMemeParams = z.infer<typeof CreateMemeParamsSchema>;
export type CreateMemeResponse = z.infer<typeof CreateMemeResponseSchema>;

