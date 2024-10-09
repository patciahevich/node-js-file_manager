
import readline from 'readline';

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

console.log(`Welcome to the File Manager, ${USERNAME}!`)


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Write your command here: ' 
});

rl.prompt();

rl.on('line', (line) => {

  switch (line.trim()) {
    case 'hello':
      console.log('Привет!');
      break;
 
      case '.exit':
        console.log(`Thank you for using File Manager, ${USERNAME}, goodbye!`);
        process.exit(0);
    default:
      console.log(`Неизвестная команда: '${line.trim()}'`);
      break;
  }

  rl.prompt();
});