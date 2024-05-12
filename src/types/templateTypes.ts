import { z } from 'zod';
import { GetTemplatesParamsSchema, TemplateListSchema, TemplateSchema } from '../schemas/templateSchemas';

export type GetTemplatesParams = z.infer<typeof GetTemplatesParamsSchema>;

export type Template = z.infer<typeof TemplateSchema>;
export type TemplateList = z.infer<typeof TemplateListSchema>;