import { SchemaSchema, type Schema as SchemaType } from 'schemas/Schema';

export class Schema {
  schema: SchemaType;
  constructor(schema: SchemaType) {
    this.schema = schema;
  }

  async validateSchema() {
    if (!(await SchemaSchema.safeParseAsync(this.schema)).success)
      throw new Error('Invalid schema.');
  }
}
