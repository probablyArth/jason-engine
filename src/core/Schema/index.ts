import { SchemaSchema, type Schema as SchemaType } from 'schemas/Schema';
import { TypeToSchema } from './Types/validation';

export class Schema {
  schema: SchemaType;
  constructor(schema: SchemaType) {
    this.schema = schema;
  }

  async validateSchema() {
    if (!(await SchemaSchema.safeParseAsync(this.schema)).success)
      throw new Error('Invalid schema.');
    Object.keys(this.schema).forEach(key => {
      const column = this.schema[key];
      if (column.default !== undefined) {
        if (!TypeToSchema[column.type]().safeParse(column.default).success) {
          throw new Error(
            `Invalid default value for type ${column.type}, received: ${column.default}`,
          );
        }
      }
    });
  }
}
