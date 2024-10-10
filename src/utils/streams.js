import fs  from 'node:fs';
import path from 'path';


export function readFile(fileName) {

  if(!fileName) {
    console.error('Operation failed: You should write the file name.');
    return;
  }

  const currentDir = process.cwd();
  const readStream = fs.createReadStream(path.join(currentDir, fileName));
  readStream.on('data', (data) => {
    console.log(data.toString())
  })

  readStream.on('error', (err) => {
    console.error(`Error reading file: ${err.message}`);
  });
}

// copy file
export function moveFile(src, dest, command) {

  const currentDir = process.cwd();
  const fileBasename =  path.basename(src);
  const fileExtname = path.extname(src);


  if (!src || !dest || !fileExtname || dest.includes('.')) {
    console.error(`Operation failed: Please use the command format: ${command} path_to_file path_to_new_directory`);
    return;
  }

  fs.stat(path.join(currentDir, src), (err) => {

  if(err) {
    console.error('Operation failed: no such file or directory');
    return;
  } 

  const readStream = fs.createReadStream(path.join(currentDir, src));
  const writeStream = fs.createWriteStream(path.join(currentDir, dest, fileBasename));

  readStream
    .pipe(writeStream)
    .on('err', (err) => {
    console.error(`Error ${command === 'cp' ? 'copying' : 'moving'} file: ${err}`);
    })

    writeStream.on('finish', () => {
  
      if(command === 'cp') {
        console.log('File copied.')
      } else {
        fs.unlink(path.join(currentDir, src), (err) => {
  
          if(err) {
            console.error(`Error moving failed: ${err}`)
          } else {
            console.log('File moved.')
          }
        })
      }
    })
  })
}