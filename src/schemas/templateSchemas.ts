import { z } from 'zod';

export const TemplateSchema = z.object({
  id: z.string(),
  name: z.string(),
  lines: z.number(),
  overlays: z.number(),
  styles: z.array(z.string()),
  blank: z.string(),
  example: z.object({
    text: z.array(z.string()),
    url: z.string(),
  }),
  keywords: z.array(z.string()),
  source: z.string().nullable(),
  _self: z.string(),
});

export const GetTemplatesParamsSchema = z.object({
  filter: z.string().optional(),
  animated: z.boolean().optional(),
});

export const TemplateListSchema = z.array(TemplateSchema);
