import readline from 'readline';

import { goUp, goToFile, showList } from './utils/navigate.js';
import { readFile, moveFile } from './utils/streams.js';
import { createFile, deleteFile, renameFile } from './utils/fs.js';
import { osInfo } from './utils/os.js';
import { calculateHash } from './utils/hash.js';
import { compressFile, decompress } from './utils/compress.js';
import { showCurrentDir } from './utils/helpers.js';

export async function createReadLine() {
  const regex = /(?<!\\)\s+/g;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> ' 
  });

  rl.prompt();

  rl.on('line', async (line) => {
    const args  = line.trim().split(regex).map((item) => item.replaceAll('\\', ''));
    const command = args[0];

    switch (command) {

      case 'cd':
        await goToFile(args[1]);
        break;

      case 'up' : 
         await goUp();
        break;

      case 'ls' :
        await showList()
        break;

      case 'add' :
        await createFile(args[1]);
        break;

      case  'cat' :
        await readFile(args[1]);
        break;

      case 'rn' :
        await renameFile(args[1], args[2]);
        break;

      case 'cp' :
        await moveFile(args[1], args[2], args[0]);
        break;

      case 'rm' :
        await deleteFile(args[1]);
        break;

      case 'mv' :
        await moveFile(args[1], args[2], args[0]);
        break;

      case 'os' :
        await osInfo(args[1]);
        break;

      case 'hash':
        await calculateHash(args[1]);
        break;

      case 'compress' :
        await compressFile(args[1], args[2]);
        break;

      case 'decompress' :
        await decompress(args[1], args[2]);
        break;

      case '.exit':
        process.exit(0);
      
      default:
        console.log('Invalid input. Please try again with a valid option.');
        break;
    }

    showCurrentDir()
    rl.prompt();
  });
}