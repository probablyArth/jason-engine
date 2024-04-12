import { z } from 'zod';

export const SchemaFieldSchema = z.object({
  type: z.union([z.literal('Date'), z.literal('String'), z.literal('Number')]),
  unique: z.optional(z.boolean()),
  required: z.optional(z.boolean()),
  default: z.optional(z.any()),
});

export const SchemaSchema = z.record(z.string(), SchemaFieldSchema);
export type Schema = z.infer<typeof SchemaSchema>;
