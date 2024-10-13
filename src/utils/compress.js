import fs from 'node:fs';
import path from 'path';
import zlib from 'node:zlib';
import { checkPath } from './helpers.js';

export async function compressFile(src, dest) {

  if(!src || !dest) {
    console.error('Invalid input. Please check README.md file');
    return;
  }

  const fileName = path.basename(src, path.extname(src));
  const SRC = path.resolve(src);
  const DEST = path.resolve(dest, `${fileName}.br`);

  const srcIsExist = await checkPath(SRC);

  if (!srcIsExist) {
    console.error('Operation failed: no such file or directory');
    return;
  }

  const destIsExist = await checkPath(DEST);

  if (destIsExist) {
    console.error('Operation failed: The same name already exists in the destination directory.');
    return;
  }
 
  const readStream = fs.createReadStream(SRC);
  const writeStream = fs.createWriteStream(DEST);
  const compress = zlib.createBrotliCompress();

  try {
    await compressPromise(readStream, compress, writeStream);
    console.log('File compressed.');
  } catch (err) {
    console.error(`Error compressing file: ${err}`)
  }
}

export async function decompress(src, dest) {
  if(!src || !dest) {
    console.error('Invalid input. Please write the command like decompress path_to_file path_to_destination or check README.md file');
    return;
  }

  const fileName = path.basename(src, path.extname(src));
  const SRC = path.resolve(src);
  const DEST = path.resolve(dest, fileName);

  const srcIsExist = await checkPath(SRC);

  if (!srcIsExist) {
    console.error('Operation failed: no such file or directory');
    return;
  }

  const destIsExist = await checkPath(DEST);

  if (destIsExist) {
    console.error('Operation failed: The same name already exists in the destination directory.');
    return;
  }

  const readStream = fs.createReadStream(SRC);
  const writeStream = fs.createWriteStream(DEST);
  const decompress = zlib.createBrotliDecompress();

  try {
    await compressPromise(readStream, decompress, writeStream);
    console.log('File decompressed.');
  } catch (err) {
    console.error(`Error decompressing file: ${err}`)
  }
}

async function compressPromise(read, transform, write) {
  return new Promise((resolve, reject) => {
    read
      .pipe(transform)
      .pipe(write)
      .on('error', (err) => {
        reject(err)
      })
      .on('finish', () => {
        resolve();
      })
  })
}