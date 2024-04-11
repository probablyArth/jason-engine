import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { METADATA_PATH } from "./constants/paths";
import { MetadataSchema } from "./schemas/Engine";
import { filePathToName, folderExists } from "./utils/fs";

export class Engine {
  //TODO
  // configuration: page-size -> no. of rows
  basePath: string;

  constructor(path: string) {
    if (!folderExists(path)) {
      throw new Error("Invalid Path");
    }
    this.basePath = path;
    if (!resolve(path, METADATA_PATH)) {
      throw new Error("Corrupt database, metadata not found.");
    }
    const metadata = this.#deserializeFile({
      filePath: METADATA_PATH,
      schema: MetadataSchema,
    });
    console.log({ metadata });
  }

  #deserializeFile<T>({
    filePath,
    schema,
  }: {
    filePath: string;
    schema: Zod.ZodObject<any>;
  }): T {
    const absoluteFilePath = resolve(this.basePath, filePath);
    const fileName = filePathToName(absoluteFilePath);
    let buffer: Buffer;
    try {
      buffer = readFileSync(absoluteFilePath);
    } catch (e) {
      throw new Error(`Invalid ${fileName} file.`);
    }
    let dataObject: T;
    try {
      dataObject = JSON.parse(buffer.toString()) as T;
    } catch (e) {
      throw new Error(`Invalid ${fileName} file.`);
    }
    if (!schema.safeParse(dataObject).success) {
      throw new Error(`Corrupt ${fileName} file.`);
    }
    return dataObject;
  }
}
