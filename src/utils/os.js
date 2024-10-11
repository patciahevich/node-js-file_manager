import os from 'node:os';
import { showCurrentDir } from './helpers.js';

export function osInfo(command) {

  if(!command) {
    console.error('Operation failed: you should write a command');
    return;
  }

  try {
    switch (command) {
      case '--EOL' :
        console.log(`The End-Of-Line character for this system is: ${JSON.stringify(os.EOL)}`);
        break;
  
      case 'crus' :
        getCrusInfo();
        break;
  
      case '--homedir' :
        console.log(`The home directory is: ${os.homedir()}`);
        break;
  
      case '--username' :
        console.log(`The current username is: ${os.userInfo().username}`);
        break;
  
      case '--architecture' :
        console.log(`The CPU architecture for which this Node.js binary has been compiled is: ${process.arch}`);
        break;
  
      default:
        console.error('Invalid input. Please check README.md file')
    }
  } catch(err) {
    console.error(`Error os operation: ${err}`)
  } finally {
    showCurrentDir();
  }


}

function getCrusInfo() {
  const cpus = os.cpus();
  const totalCPUs = cpus.length;

  console.log(`Total CPUs: ${totalCPUs}`);

  const crusTable = cpus.map((cpu, index) => {
    const model = cpu.model;
    const speedGHz = (cpu.speed / 1000).toFixed(2);
    return {
      'CPU' :  index + 1,
      'Model' :  model,
      'Clock Rate' : `${speedGHz} GHz`,
    }
  });

  console.table(crusTable)
}
