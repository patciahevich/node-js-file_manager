import fs from 'node:fs';
import path from 'path';
import { showCurrentDir } from './helpers.js';

export async function createFile(fileName) {

  if(!fileName) {
    console.error('Operation failed: You should write the file name')
    return
  }

  const currentDir = process.cwd();
  const PATH = path.join(currentDir, fileName);

  try {
    await fs.promises.writeFile(PATH, '');
    console.log(`The file ${fileName} created!`);
  } catch  (err){
    console.error(`Error creating file: ${err}`)
  } finally {
    showCurrentDir();
  }
}

export async function renameFile(pathToFile, newName) {

  if(!pathToFile || !newName) {
    console.error('Operation failed: Please use the command format: rn path_to_file new_filename');
  }

  const currentDir = process.cwd();
  const oldPath = path.join(currentDir, pathToFile);
  const newPath = path.join(currentDir, newName);

  try {
    await fs.promises.rename(oldPath, newPath);
    console.log(`The file has been renamed to ${newName}.`)
  } catch(err) {
    console.error(`Error renaming file: ${err}`)
  } finally {
    showCurrentDir();
  }
}

export async function deleteFile(fileName) {

  if(!fileName) {
    console.error('Operation failed: Please use the command in the command format: rm path_to_file');
    return
  }

  const currentDir = process.cwd();
  const PATH = path.join(currentDir, fileName);

  try {
    await fs.promises.unlink(PATH);
    console.log('File deleted.');
  } catch(err) {
    console.error(`Error deleting file: ${err}`);
  } finally {
    showCurrentDir();
  }
}



