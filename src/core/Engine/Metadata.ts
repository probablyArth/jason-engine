import { type MetadataType as MetadataT } from 'schemas/Engine';
import { basePath } from '.';
import { resolveSync } from 'bun';
import { METADATA_PATH } from 'constants/paths';

export class Metadata {
  timer: Timer | null = null;
  data: MetadataT;

  constructor(metadata: MetadataT) {
    this.data = metadata;
  }

  save() {
    this.debounce(async () => {
      await Bun.write(
        resolveSync(METADATA_PATH, basePath),
        JSON.stringify(this.data),
      );
    });
  }

  debounce(func: () => Promise<void>, timeout: number = 1000) {
    return () => {
      if (this.timer != null) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(func, timeout);
    };
  }
}
