import { z } from "zod";

export const MetadataSchema = z.object({
  db_name: z.string(),
  tables: z.array(z.string()),
});
