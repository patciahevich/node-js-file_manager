import { createHash } from 'crypto';
import path from 'path';
import fs from 'node:fs';

export async function calculateHash (pathToFile) {

  if(!pathToFile) {
    console.error('Operation failed: You should write a path to file.');
    return;
  }

  const currentDir = process.cwd();
  const PATH = path.join(currentDir, pathToFile);

  fs.stat(PATH, (err) => {

    if(err) {
      console.error(`Error: ${err}`);
      return;
    }

    const readStream = fs.createReadStream(PATH);
    readStream.setEncoding('utf-8');
  
    const hash = createHash('sha256');
    let dataToHash = '';
  
    readStream
      .on('data', (chunk) => dataToHash += chunk)
      .on('end', () => {
          console.log(`Hash : ${hash.update(dataToHash).digest('hex')}`)
      })
  })
};