import fs from 'node:fs';
import path from 'path';

export function showCurrentDir() {
  console.log(`You are currently in: ${process.cwd()}\n`)
}

export async function checkPath(pathToFile) {
  try {
    await fs.promises.stat(pathToFile);
    return true;
  } catch(err) {
    return false;
  }
}

export function testCommand(src, dest) {
  // check src and dest
  if (!src || !dest) {
    return false;
  }
  // check if src has extension
  if(!path.extname(src)) {
    return false;
  }

  // check if dest is a path to directory
  if(dest.includes('.')) {
    return false;
  }

  return true;
}