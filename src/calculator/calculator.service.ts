import { Injectable } from '@nestjs/common';
import { Worker } from 'worker_threads';
import { join } from 'path';

@Injectable()
export class CalculatorService {
  private evaluateInWorker(expression: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const worker = new Worker(join(__dirname, 'calculator.worker'), {
        workerData: { expression },
      });

      worker.on('message', (message) => {
        if (message.error) {
          reject(new Error(message.error));
        } else {
          resolve(message);
        }
      });

      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });
    });
  }

  public async calculate(expression: string): Promise<number> {
    try {
      return await this.evaluateInWorker(expression);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
