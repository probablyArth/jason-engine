import { SchemaSchema, type SchemaType } from 'schemas/Schema';

export class Schema {
  schema: SchemaType;
  constructor(schema: SchemaType) {
    this.schema = schema;
    this.#validateSchema();
  }

  #validateSchema() {
    if (!SchemaSchema.safeParse(this.schema).success)
      throw new Error('Invalid schema.');
  }
}
