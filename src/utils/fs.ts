import { statSync } from 'node:fs';
import { FILE_EXTENSION } from '../constants/paths';
import type { ZodSchema } from 'zod';
import { resolveSync, type BunFile } from 'bun';
import { basePath } from 'c/Engine';

export const filePathToName = (filePath: string) => {
  return filePath.replace(FILE_EXTENSION, '');
};

export const folderExists = (path: string) => {
  const stats = statSync(path);
  return stats.isDirectory();
};

export const deserializeFile = async <T>({
  filePath,
  schema,
}: {
  filePath: string;
  schema: ZodSchema<T>;
}): Promise<T> => {
  const absoluteFilePath = resolveSync(filePath, basePath);
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
};
