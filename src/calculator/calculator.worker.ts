import  { parentPort, workerData } from 'worker_threads';

function isValidExpression(expression) {
  const pattern = /^[0-9+\-*/().\s]*$/;
  return pattern.test(expression);
}

function evaluateExpression(expression) {
  try {
    return Function(`'use strict'; return (${expression})`)();
  } catch (error) {
    throw new Error(`Failed to evaluate expression: ${error.message}`);
  }

}

function simulateLongCalculation(expression) {
  return new Promise((resolve) => {
    // Simulate a delay
    setTimeout(() => {
      const result = evaluateExpression(expression);
      resolve(result);
    }, 500);
  });
}

(async () => {
  try {
    if (!isValidExpression(workerData.expression)) {
      throw new Error('Invalid expression: only +, -, *, /, (, and ) are allowed.');
    }

    const result = await simulateLongCalculation(workerData.expression);
    parentPort.postMessage(result);
  } catch (error) {
    parentPort.postMessage({ error: error.message });
  }
})();
