import { createHash } from 'crypto';
import path from 'path';
import fs from 'node:fs';
import { showCurrentDir } from './helpers.js';

export async function calculateHash (pathToFile) {

  if(!pathToFile) {
    console.error('Operation failed: You should write a path to file.');
    return;
  }

  const currentDir = process.cwd();
  const PATH = path.join(currentDir, pathToFile);

  try {
    await fs.promises.stat(PATH);
  } catch(err) {
    console.error('Operation failed: no such file or directory');
    return;
  }

  try {
    const hash = createHash('sha256');
    const dataToHash = await hashPromise(PATH);
   
    console.log(`Hash : ${hash.update(dataToHash).digest('hex')}`);
  } catch(err) {
    console.error(`Error hashing file: ${err}`);
  } finally {
    showCurrentDir();
  }
};

async function hashPromise(pathToFile) {
  return new Promise((resolve, reject) => {
    const readStream =  fs.createReadStream(pathToFile, { encoding: 'utf8' });
   
    let dataToHash = '';
  
  
    readStream
    .on('data', (chunk) => dataToHash += chunk)
    .on('error', (err) => {
      reject(err)
    })
    .on('end', () => {
      resolve(dataToHash)
    })
  })
}