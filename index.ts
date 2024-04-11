import { Engine } from 'engine';
import { ZodSchema, z } from 'zod';

const engine = new Engine('/home/arth/engine-pg');
(async () => {
  await engine.initialize();
  await engine.createTable({
    tableName: 'LOL',
    schema: z.object({ name: z.string() }),
  });
  const schema: ZodSchema<any> = await Bun.file(
    '/home/arth/test.schema',
  ).json();
  console.log(schema.parse({ name: 'arth' }));
})();
