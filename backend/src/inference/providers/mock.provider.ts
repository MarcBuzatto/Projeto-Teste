import { Injectable } from '@nestjs/common';
import { InferenceProvider } from './inference.provider';
import { InferenceResult } from '../interfaces/inference-result.interface';

@Injectable()
export class MockProvider implements InferenceProvider {
  private async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async analyze(frame: any): Promise<InferenceResult> {
    const started = Date.now();
    // Simula latência de IA entre 100-500ms
    const simulated = 100 + Math.floor(Math.random() * 401);
    await this.delay(simulated);

    // Resultado determinístico (operário sem capacete)
    const result: InferenceResult = {
      emotions: [
        { label: 'neutral', score: 0.72 },
        { label: 'stress', score: 0.18 },
        { label: 'happy', score: 0.10 },
      ],
      ppe: [
        { class: 'person', score: 0.98, bbox: [120, 45, 380, 540] },
        { class: 'no-helmet', score: 0.93, bbox: [180, 60, 320, 160] },
        { class: 'vest', score: 0.88, bbox: [150, 200, 350, 500] },
      ],
      risk: {
        level: 'HIGH',
        score: 0.87,
        reasons: [
          'Operário detectado sem capacete',
          'Atividade em área potencialmente perigosa',
        ],
      },
      latency_ms: Date.now() - started,
    };

    return result;
  }
}
