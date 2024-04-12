import { z } from 'zod';

export const SchemaFieldSchema = z.object({
  type: z.union([
    z.literal('Date'),
    z.literal('String'),
    z.literal('Number'),
    z.literal('Decimal'),
  ]),
});

export const SchemaSchema = z.record(z.string(), SchemaFieldSchema);
export type Schema = z.infer<typeof SchemaSchema>;
