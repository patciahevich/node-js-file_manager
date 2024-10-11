
import fs from 'node:fs';
import path from 'path';
import { showCurrentDir } from './helpers.js';
import { showFiles } from './promises.js';

export async function goUp() {

const currentDir = process.cwd();
const parentDir = path.dirname(currentDir);

  try {
    process.chdir(parentDir);
  } catch (err) {
    console.error(err)
  } finally {
    showCurrentDir();
  }
}


export async function goToFile(pathToFile) {

  if(!pathToFile) {
    console.error('Operation failed: Please use the command format: cd path_to_directory')
    return
  }

const targetDirectory = path.resolve(pathToFile);

  try {
    process.chdir(targetDirectory);
  } catch (err) {
    console.error(err);
  } finally {
    showCurrentDir()
  }
}


export async function showList() {
  const currentDir = process.cwd();
  const directories = [];
  const files = [];

  try {
    const filesInFolder = await fs.promises.readdir(currentDir);
    await showFiles(filesInFolder, directories, files);
    console.log('\n');
    console.table(directories.concat(files));
    console.log('\n');
  } catch(err) {
    console.error(`Error list files: ${err}`);
  } finally {
    showCurrentDir();
  }
}