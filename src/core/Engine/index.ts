import { resolve } from 'node:path';
import { METADATA_PATH } from 'constants/paths';
import { MetadataSchema, type MetadataType } from 'schemas/Engine';
import { deserializeFile, folderExists } from 'utils/fs';
import type { Schema as SchemaType } from 'schemas/Schema';
import { Schema } from 'c/Schema';
import { normalizeTableName } from 'utils/string';
import { Metadata } from './Metadata';

export let basePath: string = '';

export class JasonEngine {
  //TODO
  // configuration: page-size -> no. of rows
  page_size: number;
  metadata: Metadata | null = null;

  constructor(path: string, page_size: number = 3) {
    if (!folderExists(path)) {
      throw new Error('Invalid Path');
    }
    basePath = path;
    this.page_size = page_size;
  }

  async createTable(name: string, schema: SchemaType) {
    const normalizedTableName = normalizeTableName(name);

    if (this.metadata == null) throw new Error('Engine not initialized');

    if (Object.keys(this.metadata.data.tables).includes(normalizedTableName))
      throw new Error(`Table with name ${normalizedTableName} already exists.`);

    const tableSchema = new Schema(schema);

    await tableSchema.validateSchema();

    this.metadata.data.tables[normalizedTableName] = schema;
    await this.metadata.save();

    return normalizedTableName;
  }

  async initialize() {
    if (this.metadata !== null) return true;
    if (!resolve(basePath, METADATA_PATH)) {
      throw new Error('Corrupt database, metadata not found.');
    }
    const metadata = await deserializeFile<MetadataType>({
      filePath: METADATA_PATH,
      schema: MetadataSchema,
    });
    this.metadata = new Metadata(metadata);
  }
}
