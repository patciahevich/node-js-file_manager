import fs from 'node:fs';
import path from 'path';
import zlib from 'node:zlib';

export function compressFile(src, dest) {

  if(!src || !dest) {
    console.error('Invalid input. Please check README.md file');
    return;
  }

  const currentDir = process.cwd();
  const SRC = path.join(currentDir, src);
  const DEST = path.join(currentDir, `${dest}.br`);

  const readStream = fs.createReadStream(SRC);
  const writeStream = fs.createWriteStream(DEST);
  const compress = zlib.createBrotliCompress();

  readStream
    .pipe(compress)
    .pipe(writeStream)
    .on('error' , (err)=> {
      console.error(`Error compressing: ${err}`)
    })
    .on('finish', () => {
      console.log('File compressed.')
    })
}

export function decompress(src, dest) {
  if(!src || !dest) {
    console.error('Invalid input. Please check README.md file');
    return;
  }

  const currentDir = process.cwd();
  const SRC = path.join(currentDir, src);
  const DEST = path.join(currentDir, dest);

  const readStream = fs.createReadStream(SRC);
  const writeStream = fs.createWriteStream(DEST);
  const decompress = zlib.createBrotliDecompress();

  readStream
    .pipe(decompress)
    .pipe(writeStream)
    .on('error' , (err)=> {
      console.error(`Error decompressing: ${err}`)
    })
    .on('finish', () => {
      console.log('File decompressed.')
    })
}