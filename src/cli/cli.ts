import yargs from 'yargs';
import { execSync } from 'child_process';

import { hideBin } from 'yargs/helpers';
const argv = yargs(hideBin(process.argv)).parseSync();

/* List out all the options for cli interaction
 - buildModel
 - buildFunctions
 - addQuantityToModel
*/

const npmCommands = [];

// Build the model
if (argv.buildModel) {
  npmCommands.push('npm run build');
}

// Build the functions
if (argv.buildFunctions) {
  npmCommands.push('npm run postbuild');
}

if (npmCommands) {
  executeNpmCommands(npmCommands);
}

export async function executeNpmCommands(commands: string[]) {
  const commandsOutput = await Promise.all(
    commands.map((command) => {
      const output = execSync(command);
      return output.toString();
    })
  );

  commandsOutput.map((output) => {
    console.log(output);
  });
}
