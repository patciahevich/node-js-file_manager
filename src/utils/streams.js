import path from 'path';
import { readFileWithPromise, moveFileWithPromise } from './promises.js';
import { testCommand, checkPath } from './helpers.js';


export async function readFile(pathToFile) {

  if(!pathToFile) {
    console.error('Operation failed: You should write the file name.');
    return;
  }

  const PATH = path.resolve(pathToFile)

  const isExist = await checkPath(PATH);
  if(!isExist) {
    console.error('There is no file with this name.');
    return;
  }

  try {
    await readFileWithPromise(PATH);
  } catch(err) {
    console.error(`Error reading file: ${err}`);
  }
}

// copy or move file (depends on the command as 3th parameter)
export async function moveFile(src, dest, command) {

  if(!testCommand(src, dest)) {
    console.error(`Operation failed: Please use the command format: ${command} path_to_file path_to_new_directory`);
    return;
  }

  const SRC = path.resolve(src);
  const DEST = path.resolve(dest);

  if(DEST === process.cwd()) {
    console.error(`Error: Cannot ${command === 'cp' ? 'copy' : 'move'} the file to the same directory.`);
    return;
  }
  const srcIsExist = await checkPath(SRC);

  if(!srcIsExist) {
    console.error('There is no file with this name.');
    return;
  }

  try {
    await moveFileWithPromise(SRC, DEST, command);
  } catch(err) {
    console.error(`Error ${command === 'cp' ? 'copying' : 'moving'} file: ${err}`);
  }
}

