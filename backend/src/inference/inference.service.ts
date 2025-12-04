import { Inject, Injectable } from '@nestjs/common';
import { InferenceProvider } from './providers/inference.provider';
import { InferenceResult } from './interfaces/inference-result.interface';

@Injectable()
export class InferenceService {
  constructor(
    @Inject(InferenceProvider) private readonly provider: InferenceProvider,
  ) {}

  private withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
    let timer: NodeJS.Timeout;
    const timeoutPromise = new Promise<T>((_, reject) => {
      timer = setTimeout(() => reject(new Error('Timeout exceeded')), ms);
    });
    return Promise.race([promise, timeoutPromise]).finally(() => {
      clearTimeout(timer);
    }) as Promise<T>;
  }

  async analyzeFrame(frame: any): Promise<InferenceResult> {
    const maxRetries = 3;
    let lastError: any;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // timeout de 2s por tentativa
        const res = await this.withTimeout(
          this.provider.analyze(frame),
          2000,
        );
        return res;
      } catch (err) {
        lastError = err;
        if (attempt === maxRetries) break;
      }
    }
    throw lastError ?? new Error('Inference failed');
  }
}
