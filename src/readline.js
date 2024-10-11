import readline from 'readline';

import { goUp, goToFile, showList } from './utils/navigate.js';
import { readFile, moveFile } from './utils/streams.js';
import { createFile, deleteFile, renameFile } from './utils/fs.js';
import { osInfo } from './utils/os.js';
import { calculateHash } from './utils/hash.js';
import { compressFile, decompress } from './utils/compress.js';

export async function createReadLine() {

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>\n ' 
  });

  rl.prompt();

  rl.on('line', (line) => {
    const args  = line.trim().split(' ');
    const command = args[0]

    switch (command) {

      case 'cd':
        goToFile(args[1]);
        break;

      case 'up' : 
        goUp();
        break;

      case 'ls' :
        showList()
        break;

      case 'add' :
        createFile(args[1]);
        break;

      case  'cat' :
        readFile(args[1]);
        break;

      case 'rn' :
        renameFile(args[1], args[2]);
        break;

      case 'cp' :
        moveFile(args[1], args[2], args[0]);
        break;

      case 'rm' :
        deleteFile(args[1]);
        break;

      case 'mv' :
        moveFile(args[1], args[2], args[0]);
        break;

      case 'os' :
        osInfo(args[1]);
        break;

      case 'hash':
        calculateHash(args[1]);
        break;

      case 'compress' :
        compressFile(args[1], args[2]);
        break;

      case 'decompress' :
        decompress(args[1], args[2]);
        break;

      case '.exit':
        process.exit(0);
      
      default:
        console.log('Invalid input. Please try again with a valid option.');
        break;
    }
    rl.prompt();
  });
}