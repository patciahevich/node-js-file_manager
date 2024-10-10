import fs from 'node:fs';
import path from 'path';

export function createFile(fileName) {

  if(!fileName) {
    console.error('Operation failed: You should write the file name')
    return
  }

  const currentDir = process.cwd();

  const PATH = path.join(currentDir, fileName)

  fs.writeFile(PATH, '', (err) => {

    if (err) {
      console.error(`Error creating file: ${err}`)
    } else {
      console.log(`The file ${fileName} created!`)
    }
  })
}

export function renameFile(pathToFile, newName) {

  if(!pathToFile || !newName) {
    console.error('Operation failed: Please use the command format: rn path_to_file new_filename')
  }

  const currentDir = process.cwd();
  fs.rename(path.join(currentDir, pathToFile), path.join(currentDir, newName), (err) => {

    if(err) {
      console.error(`Error renaming file: ${err}`)
    } else {
      console.log(`The file has been renamed to ${newName}.`)
    }
  })
}


export function deleteFile(fileName) {

  if(!fileName) {
    console.error('Operation failed: Please use the command in the command format: rm path_to_file')
    return
  }

  const currentDir = process.cwd();
  const PATH = path.join(currentDir, fileName);

  fs.unlink(PATH, (err) => {
    if(err) {
      console.error(`Error deleting file: ${err}`)
    }

    console.log('File deleted.')
  })
}



