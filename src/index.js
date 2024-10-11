

// import os from 'os';

import { createReadLine } from "./readline.js";


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

createReadLine();