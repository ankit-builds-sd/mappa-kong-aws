import { ApiInputs, Context } from '../../interfaces';

export function getContextObject(
  projectInputs: ApiInputs['projectInputs'],
  staticValues: ApiInputs['staticValues']
) {
  const context: Context = {
    projectInputs: projectInputs,
    staticValues: staticValues,
  };

  return context;
}
