import { statSync } from "node:fs";
import { FILE_EXTENSION } from "../constants/paths";

export const filePathToName = (filePath: string) => {
  return filePath.replace(FILE_EXTENSION, "");
};

export const folderExists = (path: string) => {
  try {
    const stats = statSync(path);
    return stats.isDirectory();
  } catch (error: any) {
    if (error.code === "ENOENT") {
      return false;
    } else {
      throw error;
    }
  }
};
