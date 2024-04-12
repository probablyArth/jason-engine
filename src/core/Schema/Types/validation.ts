import { ZodType, z } from 'zod';
import type { Types } from '.';

export const TypeToSchema: Record<keyof typeof Types, () => ZodType> = {
  Date: z.date,
  String: z.string,
  Number: z.number,
};
