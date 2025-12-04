import { InferenceResult } from '../interfaces/inference-result.interface';

export abstract class InferenceProvider {
  abstract analyze(frame: any): Promise<InferenceResult>;
}
