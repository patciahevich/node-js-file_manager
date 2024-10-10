
import readline from 'readline';
// import os from 'os';
import { goUp, goToFile, showList } from './utils/navigate.js';
import { readFile, copyFile, moveFile } from './utils/streams.js';
import { createFile, deleteFile, renameFile } from './utils/fs.js';

const args = process.argv.slice(2);

const usernameArg = args.find(arg => arg.startsWith('--username='));

if (!usernameArg) {
  console.error("Error: --username argument is required.");
  process.exit(1);
}

const USERNAME = usernameArg.split('=')[1];


if (!USERNAME) {
  console.error("Error: username value is required.");
  process.exit(1);
}

// const homeDir = os.homedir();
// process.chdir(homeDir);

console.log(`Welcome to the File Manager, ${USERNAME}!`);
console.log(`You are currently in :${process.cwd()}`);


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '\n>\n ' 
});

rl.prompt();

rl.on('line', (line) => {
  line = line.trim();

  switch (true) {

    case line.startsWith('cd') :
      goToFile(line.trim());
      break;

    case line ===  'up' : 
      goUp();
      break;
    case line === 'ls' :
      showList()
      break;

    case line.startsWith('add') :
      createFile(line);
      break;

    case line.startsWith('cat') :
      readFile(line);
      break;

    case line.startsWith('rn') :
      renameFile(line);
      break;

    case line.startsWith('cp') :
      copyFile(line);
      break;

    case line.startsWith('rm') :
      deleteFile(line);
      break;

    case line.startsWith('mv') :
      moveFile(line);
      break;

    case line ===  '.exit':
      console.log(`Thank you for using File Manager, ${USERNAME}, goodbye!`);
      process.exit(0);

    
    default:
      console.log('Invalid input. Please try again with a valid option.');
      break;
  }

  console.log(`You are currently in :${process.cwd()}`)
  rl.prompt();
});