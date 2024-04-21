import { type MetadataType as MetadataT } from 'schemas/Engine';
import { basePath } from '.';
import { resolveSync } from 'bun';
import { METADATA_PATH } from 'constants/paths';

export class Metadata {
  data: MetadataT;

  constructor(metadata: MetadataT) {
    this.data = metadata;
  }

  async save() {
    await Bun.write(resolveSync(METADATA_PATH, basePath), JSON.stringify(this.data));
  }
}
