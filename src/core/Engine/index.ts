import { resolve } from 'node:path';
import { METADATA_PATH } from 'constants/paths';
import { MetadataSchema, type Metadata } from 'schemas/Engine';
import { filePathToName, folderExists } from 'utils/fs';
import { type BunFile } from 'bun';
import { ZodSchema } from 'zod';
import type { Schema as SchemaType } from 'schemas/Schema';
import { Schema } from 'c/Schema';

export class Engine {
  //TODO
  // configuration: page-size -> no. of rows
  basePath: string;
  page_size: number;
  metadata: Metadata | undefined;

  constructor(path: string, page_size: number = 3) {
    if (!folderExists(path)) {
      throw new Error('Invalid Path');
    }
    this.basePath = path;
    this.page_size = page_size;
  }

  async createTable(name: string, schema: SchemaType) {
    if (this.metadata!.tables.includes(name))
      throw new Error(`Table already exists.\nCreating: ${name}`);
    const tableSchema = new Schema(schema);
    await tableSchema.validateSchema();
  }

  async initialize() {
    if (!resolve(this.basePath, METADATA_PATH)) {
      throw new Error('Corrupt database, metadata not found.');
    }
    const metadata = await this.#deserializeFile<Metadata>({
      filePath: METADATA_PATH,
      schema: MetadataSchema,
    });
    this.metadata = metadata;
  }

  async #deserializeFile<T>({
    filePath,
    schema,
  }: {
    filePath: string;
    schema: ZodSchema<T>;
  }): Promise<T> {
    const absoluteFilePath = resolve(this.basePath, filePath);
    const fileName = filePathToName(absoluteFilePath);
    let buffer: BunFile;
    try {
      buffer = Bun.file(absoluteFilePath);
    } catch (e) {
      throw new Error(`Invalid ${fileName} file.`);
    }
    let dataObject: T;
    try {
      dataObject = (await buffer.json()) as T;
    } catch (e) {
      throw new Error(`Invalid ${fileName} file.`);
    }
    if (!schema.safeParse(dataObject).success) {
      throw new Error(`Corrupt ${fileName} file.`);
    }
    return dataObject;
  }
}
