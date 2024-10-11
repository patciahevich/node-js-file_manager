import fs  from 'node:fs';
import path from 'path';

export async function readFileWithPromise(fileName) {
  return new Promise((resolve, reject) => {
    const currentDir = process.cwd();
    const readStream = fs.createReadStream(path.join(currentDir, fileName));
    readStream.on('data', (data) => {
      console.log(data.toString())
    })

    readStream.on('end', () => {
      resolve();
    })
  
    readStream.on('error', (err) => {
      reject(err);
    });
  })
}

export async function moveFileWithPromise(src, dest, currentDir, command) {
  const fileBasename =  path.basename(src);

  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(path.join(currentDir, src));
    const writeStream = fs.createWriteStream(path.join(currentDir, dest, fileBasename));
  
    readStream
      .pipe(writeStream)
      .on('error', (err) => {
        reject(err);
      })
  
      writeStream.on('finish', () => {
    
        if(command === 'cp') {
          console.log('File copied.');
        } else {
          fs.unlink(path.join(currentDir, src), (err) => {
    
            if(err) {
              reject(err)
            } else {
              console.log('File moved.')
            }
          })
        }
        resolve();
      })
  })
}

export async function showFiles(filesInFolder, directories, files) {
  const statePromises = filesInFolder.map((file) => {
    return new Promise((resolve, reject) => {
      fs.stat(file, (err, stat) => {

        if(err) {
          reject(err)
        } else {

          if (stat.isDirectory()) {
            directories.push({
              name: file,
              type: 'folder'
            })
          } else {
            files.push({
              name: file,
              type: 'file'
            })
          }
          resolve()
        }
      })
    })
  })
  return Promise.all(statePromises);
}