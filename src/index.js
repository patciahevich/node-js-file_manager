
import readline from 'readline';
// import os from 'os';
import { goUp, goToFile, showList } from './utils/navigate.js';
import { readFile, moveFile } from './utils/streams.js';
import { createFile, deleteFile, renameFile } from './utils/fs.js';
import { osInfo } from './utils/os.js';

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

process.on('exit', () => {
  console.log(`Thank you for using File Manager, ${USERNAME}, goodbye!`);
})


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

    case '.exit':
      process.exit(0);
    
    default:
      console.log('Invalid input. Please try again with a valid option.');
      break;
  }

  console.log(`You are currently in: ${process.cwd()}\n`)
  rl.prompt();
});