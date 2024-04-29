import fs, { existsSync, mkdirSync } from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

export function readFileSync(filePath: string) {
  try {
    const directory = joinPaths([filePath, '../']);
    // Check if the directory exists
    if (!existsSync(directory)) {
      // If not, create the directory
      console.log(
        `Directory '${directory}' does not exists, while reading file ${filePath}.`
      );
      return null;
    }

    const fileData = fs.readFileSync(filePath, {
      encoding: 'utf8',
      flag: 'r',
    });

    return fileData ? JSON.parse(fileData) : null;
  } catch (error) {
    console.log(error);
  }
}

export function writeFileSync(
  filePath: string,
  data: any,
  createFolderIfNotExists: boolean = false
): void {
  try {
    const directory = path.join(filePath, '../');
    if (createFolderIfNotExists) {
      // Check if the directory exists
      if (!existsSync(directory)) {
        // If not, create the directory
        mkdirSync(directory, { recursive: false });
        console.log(
          `Directory '${directory}' created, while using WriteFileSync.`
        );
      }
    }

    fs.writeFileSync(filePath, data);
    console.log(`File written successfully at ${filePath}`);
  } catch (error) {
    console.log(error);
  }
}

export function appendFile(filePath: string, data: any): void {
  fs.appendFile(filePath, data, (err: any) => {
    if (err) console.log(err);
  });
}

export function getTestsDataFilePath() {
  const filePath = path.join(
    __dirname,
    '../',
    'tests',
    'data',
    'tests.data.json'
  );
  return filePath;
}

export function getModelDirectory() {
  return path.join(__dirname, '../', '../', '../', 'models');
}

export function getLookupDirectory() {
  return path.join(__dirname, '../', '../', '../', 'lookups');
}

export async function getAllModelNames(): Promise<string[]> {
  try {
    const folders = await fsPromises.readdir(getModelDirectory());
    return folders;
  } catch (error) {}
}

export function joinPaths(pathChunks: string[]) {
  return path.join(...pathChunks);
}
