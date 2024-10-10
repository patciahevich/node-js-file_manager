import fs from 'node:fs';
import path from 'path';


export function readFile(command) {

  const fileName = command.slice(4);
  const currentDir = process.cwd();

  if(!fileName) {
    console.error('Operation failed: You should write the file name.');
    return;
  }

  const readStream = fs.createReadStream(path.join(currentDir, fileName));
  readStream.on('data', (data) => {
    console.log(data.toString())
  })

  readStream.on('error', (err) => {
    console.error(`Error reading file: ${err.message}`);
  });
}

export function copyFile(command) {

  const [SRC, DEST] = command.slice(3).split(' ');
  const currentDir = process.cwd();
  const fileBasename =  path.basename(SRC);
  const fileExtname = path.extname(SRC);


  if (!SRC || !DEST || !fileExtname || DEST.includes('.')) {
    console.error('Operation failed: Please use the command format: cp path_to_file path_to_new_directory');
    return;
  }

  fs.stat(path.join(currentDir, SRC), (err) => {

  if(err) {
    console.error('Operation failed: no such file or directory');
    return;
  } 

  const readStream = fs.createReadStream(path.join(currentDir, SRC));
  const writeStream = fs.createWriteStream(path.join(currentDir, DEST, fileBasename));

  readStream
    .pipe(writeStream)
    .on('err', (err) => {
    console.error(`Error copying file: ${err}`);
    })
  })
}

export function moveFile(command) {
  copyFile(command);

  const file = command.split(' ')[1];
  const currentDir = process.cwd();

  fs.unlink(path.join(currentDir, file), (err) => {
    
    if(err) {
      console.error(`Error moving failed: ${err}`)
    } else {
      console.log('File moved.')
    }
  })
}