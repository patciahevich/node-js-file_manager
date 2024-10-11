import fs  from 'node:fs';
import path from 'path';
import { readFileWithPromise, moveFileWithPromise } from './promises.js';
import { showCurrentDir, testCommand } from './helpers.js';


export async function readFile(fileName) {

  if(!fileName) {
    console.error('Operation failed: You should write the file name.');
    return;
  }

  try {
    await readFileWithPromise(fileName);
  } catch(err) {
    console.error(`Error reading file: ${err}`);
  } finally {
    showCurrentDir();
  }
}

// copy or move file (depends on the command as 3th parameter)
export async function moveFile(src, dest, command) {

  if(!testCommand(src, dest)) {
    console.error(`Operation failed: Please use the command format: ${command} path_to_file path_to_new_directory`);
    return;
  }

  const currentDir = process.cwd();
  const PATH = path.join(currentDir, src);
  
  try {
    await fs.promises.stat(PATH);
  } catch(err) {
    console.error('Operation failed: no such file or directory');
    return;
  }

  try {
    await moveFileWithPromise(src, dest, currentDir, command);
  } catch(err) {
    console.error(`Error ${command === 'cp' ? 'copying' : 'moving'} file: ${err}`);
  } finally {
    showCurrentDir();
  }
}

