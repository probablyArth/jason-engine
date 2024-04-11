import { statSync } from 'node:fs';
import { FILE_EXTENSION } from '../constants/paths';

export const filePathToName = (filePath: string) => {
  return filePath.replace(FILE_EXTENSION, '');
};

export const folderExists = (path: string) => {
  const stats = statSync(path);
  return stats.isDirectory();
};
