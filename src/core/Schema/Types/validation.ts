import { ZodType, z } from 'zod';

export const TypeToSchema: Record<string, () => ZodType> = {
  Date: z.date,
  String: z.string,
  Number: z.number,
  Boolean: z.boolean,
};
