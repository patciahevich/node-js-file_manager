import fs from 'node:fs';
import path from 'path';
import { showCurrentDir, checkPath } from './helpers.js';

export async function createFile(fileName) {

  if(!fileName) {
    console.error('Operation failed: You should write the file name')
    return
  }

  const PATH = path.resolve(fileName);

  try {
    const isExist = await checkPath(PATH);

    if(isExist) {
      console.error('The file with same name is already exists.');
      return;
    }

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
    return;
  }

  const oldPath = path.resolve(pathToFile);
  const newPath = path.resolve(newName);

  try {
    const isExist = await checkPath(oldPath);
    if(!isExist) {
      console.error('There is no file with same name.');
      return;
    }
  
    const isSameExist = await checkPath(newPath);
    if(isSameExist) {
      console.error('The file with same name is already exists.');
      return;
    } 

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

  const PATH = path.resolve(fileName);

  try {
    const isExist = await checkPath(PATH);
    if(!isExist) {
      console.error('There is no file with this name.');
      return;
    }

    await fs.promises.unlink(PATH);
    console.log('File deleted.');
  } catch(err) {
    console.error(`Error deleting file: ${err}`);
  } finally {
    showCurrentDir();
  }
}



