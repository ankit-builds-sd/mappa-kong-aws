// import { NextFunction, Request, Response } from 'express';
// import cors from 'cors';

// import { getContextObject } from '../components/helpers/Invoker/invokerHelper';
// import {
//   ApiInputs,
//   CalculationTree,
//   InvokerResult,
//   ApiResponse,
// } from '../components/interfaces';
// import { Invoker } from '../components/invoker/invoker';

// import express from 'express';
// import http from 'http';

// const app = express();
// const modelServer = http.createServer(app);

// app.use(cors());
// app.use(express.json());

// let childServerPort = null;

// function restartServer(modelName: string) {
//   modelServer.close((err) => {
//     if (err) {
//       console.error('Error closing server:', err);
//     } else {
//       console.log(
//         'Restarting the server on port ${modelServerPort} again for model ${modelName}...'
//       );
//       modelServer.listen(childServerPort, () => {
//         console.log(
//           `Server listening on port ${childServerPort} again for model ${modelName}.`
//         );
//       });
//     }
//   });
// }

// // Trigger the invoker & return its result
// app.post('/result', async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const inputs: ApiInputs = req.body.inputs;
//     const quantityNames: string[] = req.body.quantityNames;
//     const returnCalcTree: boolean = !!req.query.calcTree;

//     if (!inputs) {
//       res.status(401).json({
//         status: 'failed',
//         message: 'Please provide an inputs object',
//       });
//     }

//     if (!inputs.projectInputs || !inputs.staticValues) {
//       res.status(401).json({
//         status: 'failed',
//         message: 'Please provide projectInputs or staticValues property.',
//       });
//     }

//     // Extract projectInputs and static values
//     const { projectInputs, staticValues } = inputs;

//     // ---- Generate the response, by invoking the Invoker and return it to the user
//     const context = getContextObject(projectInputs, staticValues);
//     const result: { [key: string]: number }[] = [];
//     const memo: Map<string, number> = new Map<string, number>();
//     const calcTree: CalculationTree = {};

//     // Create an array to store promises for all invocations
//     const invocationPromises: Promise<void>[] = [];

//     for (const qName of quantityNames) {
//       invocationPromises.push(
//         new Promise(async (resolve, reject) => {
//           // Create an instance of the Invoker
//           const invoker = new Invoker(qName.split('__')[0]);

//           setTimeout(async function () {
//             try {
//               const invokerResult: InvokerResult = await invoker.invoke(
//                 qName,
//                 context,
//                 memo,
//                 calcTree
//               );

//               if (invokerResult) {
//                 result.push({ [invokerResult.id]: invokerResult.value });
//               }
//             } catch (error) {
//               reject(error);
//             }

//             resolve();
//           }, 0);
//         })
//       );
//     }

//     // Wait for all invocations to complete before sending the response
//     await Promise.all(invocationPromises);

//     const response: ApiResponse = {
//       status: 'success',
//       data: result,
//     };

//     // Return the calcTree, if returnCalcTree is passed in the API.
//     if (returnCalcTree) {
//       // Modified the structure of the calcTree
//       response['calcTree'] = calcTree;
//     }

//     // If infoContainer is not empty, send it back as a response.
//     if (Invoker.getInfoContainer().length) {
//       response.infoContainer = Invoker.getInfoContainer();
//     }

//     res.status(200).send(response);
//   } catch (error) {
//     next(error);
//   }
// });
