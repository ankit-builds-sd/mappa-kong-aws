import { getModelDirectory, joinPaths, readFileSync, writeFileSync } from './components/helpers/File/FileHelper';

(function () {
  // Get the model path from the command line
  const command_args = process.argv.slice(2);

  const c_args = command_args.map((el) => {
    const keyValuePair = el.split('=');
    return { [keyValuePair[0]]: keyValuePair[1] };
  });

  // Check if the c_args contain a parent and child property, and if both exists. If any one of them is missing, then throw an error stating which property is missing.
  if (c_args.some((el) => el.hasOwnProperty('parent')) && c_args.some((el) => el.hasOwnProperty('child'))) {
    const parent = c_args.find((el) => el.hasOwnProperty('parent')).parent;
    const child = c_args.find((el) => el.hasOwnProperty('child')).child;
    console.log(`Parent: ${parent}, Child: ${child}`);

    // If both parent and child exists, then call the integrate function with the parent and child as arguments
    integrateModels(parent, child);
  } else {
    throw new Error('Please provide both parent and child arguments');
  }
})();

function integrateModels(parent: string, child: string) {
  const modelDirectory = getModelDirectory();
  const parentModelDirectory = joinPaths([modelDirectory, parent, 'model.json']);

  const parentModelData = readFileSync(parentModelDirectory);

  if (parentModelData.extends) {
    parentModelData.extends.push(`../${child}`);
  } else {
    parentModelData.extends = [`../${child}`];
  }

  writeFileSync(parentModelDirectory, JSON.stringify(parentModelData));
}
