
import fs from 'node:fs';
import path from 'path';
import { checkPath, sortByName } from './helpers.js';
import { showFiles } from './promises.js';

export async function goUp() {

const currentDir = process.cwd();
const parentDir = path.dirname(currentDir);

  try {
    process.chdir(parentDir);
  } catch (err) {
    console.error(err)
  }
}

export async function goToFile(pathToFile) {

  if(!pathToFile) {
    console.error('Operation failed: Please use the command format: cd path_to_directory')
    return
  }

  let PATH = path.resolve(pathToFile);

  try {
    const isExist = await checkPath(PATH);

    if(!isExist) {
      console.error('No directory or file found with the specified name.');
      return;
    }

    process.chdir(PATH);
  } catch (err) {
    console.error(`Error going to file: ${err}`);
  }
}


export async function showList() {
  const currentDir = process.cwd();
  const directories = [];
  const files = [];

  try {
    const filesInFolder = await fs.promises.readdir(currentDir);
    console.log(filesInFolder)
    await showFiles(filesInFolder, directories, files);
    console.log('\n');
    console.table(directories.sort(sortByName).concat(files.sort(sortByName)));
    console.log('\n');
  } catch(err) {
    console.error(`Error list files: ${err}`);
  }
}