import { z } from 'zod';

export const MemeSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  width: z.number(),
  height: z.number(),
  box_count: z.number(),
});

export const CreateMemeResponseSchema = z.object({
  url: z.string(),
});

export const CreateMemeParamsSchema = z.object({
  style: z.array(z.string()).optional(),
  text: z.array(z.string()).optional(),
  layout: z.string().optional(),
  font: z.string().optional(),
  extension: z.string().optional(),
  redirect: z.literal(true).optional(),
});