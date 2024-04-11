import { Types } from 'Types';

type field = { type: keyof typeof Types };

export class Schema {
  schema: Map<string, field>;
  constructor(schema: Map<string, field>) {
    this.schema = schema;
    this.#validateSchema();
  }

  #validateSchema() {
    for (const key in this.schema) {
      if (typeof Types[key] === 'undefined') {
        throw new Error(`Invalid type ${key}`);
      }
    }
  }
}
