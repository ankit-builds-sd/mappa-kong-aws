import { Invoker } from '../components/invoker/invoker';
import * as Helper from '../components/utils/utils';
import { ApiInputs, InvokerResult, TestData } from '../components/interfaces';

function tester(
  testName: string,
  quantityNames: string,
  inputs: ApiInputs,
  outputs
) {
  // Variables need for Invoker
  const result: { [key: string]: number }[] = [];
  // Get the actual result
  for (const qName of quantityNames) {
    const invokerResult: InvokerResult = Invoker.invoke(
      qName,
      Helper.getContextObject(inputs.projectInputs, inputs.staticValues),
      new Map<string, number>(),
      {}
    );

    if (invokerResult) {
      result.push({ [invokerResult.id]: invokerResult.value });
    }
  }

  // Test it agains the values obtained from the testData "outputs"
  it(testName, () => {
    expect(result).toEqual(outputs);
  });
}

// Test Data
const testData: TestData[] = Helper.getTestsJsonData();

for (const testNode of testData) {
  for (const [testName, testParameters] of Object.entries(testNode)) {
    const { inputs, quantityNames, outputs } = testParameters;

    describe('should test the model using the json file', () => {
      tester(testName, quantityNames, inputs, outputs);
    });
  }
}
