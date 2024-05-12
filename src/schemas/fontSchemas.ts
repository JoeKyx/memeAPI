import { z } from 'zod';

export const FontSchema = z.object({
  id: z.string(),
  alias: z.string().nullable(),
  filename: z.string(),
  _self: z.string(),
});

export const FontListSchema = z.array(FontSchema);
