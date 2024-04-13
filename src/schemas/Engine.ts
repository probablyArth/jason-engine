import { z } from 'zod';
import { SchemaSchema } from './Schema';

export const MetadataSchema = z.object({
  db_name: z.string(),
  tables: z.record(z.string(), SchemaSchema),
});

export type MetadataType = z.infer<typeof MetadataSchema>;
