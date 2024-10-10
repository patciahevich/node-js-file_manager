
import fs from 'node:fs';
import path from 'path';

export function goUp() {

const currentDir = process.cwd();
const parentDir = path.dirname(currentDir);

  try {
    process.chdir(parentDir);
  } catch (err) {
    console.error(err)
  }
}


export function goToFile(pathToFile) {

  if(!pathToFile) {
    console.error('Operation failed: Please use the command format: cd path_to_directory')
    return
  }

const targetDirectory = path.resolve(pathToFile);

  try {
    process.chdir(targetDirectory);
  } catch (err) {
    console.error(err);
  }
}


export function showList() {
const currentDir = process.cwd();

  fs.readdir(currentDir, (err, filesInFolder) => {

    if (err) {
      console.error(err)
      return;
    }

    const directories = [];
    const files = [];

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

    Promise.all(statePromises).then(() => {
      console.log('\n')
      console.table(directories.concat(files))
    }).catch(err => console.error(err))
  });

}