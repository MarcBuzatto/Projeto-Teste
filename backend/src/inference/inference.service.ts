import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InferenceProvider } from './providers/inference.provider';
import { InferenceResult } from './interfaces/inference-result.interface';
import { Event } from './schemas/event.schema';

@Injectable()
export class InferenceService {
  constructor(
    @Inject(InferenceProvider) private readonly provider: InferenceProvider,
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
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
        // Salva o evento automaticamente
        await this.saveEvent(res);
        return res;
      } catch (err) {
        lastError = err;
        if (attempt === maxRetries) break;
      }
    }
    throw lastError ?? new Error('Inference failed');
  }

  async saveEvent(result: InferenceResult): Promise<Event> {
    const event = new this.eventModel({
      timestamp: new Date(),
      type: 'inference',
      riskLevel: result.risk.level,
      providerResult: result,
    });
    return event.save();
  }

  async getDashboardMetrics() {
    // Distribuição de Risco
    const riskDistribution = await this.eventModel.aggregate([
      {
        $group: {
          _id: '$riskLevel',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          level: '$_id',
          count: 1,
        },
      },
    ]);

    // EPIs - Contagem por classe detectada
    const ppeDistribution = await this.eventModel.aggregate([
      {
        $unwind: '$providerResult.ppe',
      },
      {
        $group: {
          _id: '$providerResult.ppe.class',
          count: { $sum: 1 },
          avgScore: { $avg: '$providerResult.ppe.score' },
        },
      },
      {
        $project: {
          _id: 0,
          class: '$_id',
          count: 1,
          avgScore: { $round: ['$avgScore', 2] },
        },
      },
    ]);

    // Emoções - Contagem por tipo
    const emotionDistribution = await this.eventModel.aggregate([
      {
        $unwind: '$providerResult.emotions',
      },
      {
        $group: {
          _id: '$providerResult.emotions.label',
          count: { $sum: 1 },
          avgScore: { $avg: '$providerResult.emotions.score' },
        },
      },
      {
        $project: {
          _id: 0,
          emotion: '$_id',
          count: 1,
          avgScore: { $round: ['$avgScore', 2] },
        },
      },
    ]);

    // Total de eventos processados
    const totalEvents = await this.eventModel.countDocuments();

    // Tempo médio entre eventos HIGH (últimas 10 análises HIGH)
    const highRiskEvents = await this.eventModel
      .find({ riskLevel: 'HIGH' })
      .sort({ timestamp: -1 })
      .limit(10)
      .select('timestamp');

    let avgTimeBetweenHighRisk = 0;
    if (highRiskEvents.length > 1) {
      let totalTime = 0;
      for (let i = 0; i < highRiskEvents.length - 1; i++) {
        const diff = highRiskEvents[i].timestamp.getTime() - highRiskEvents[i + 1].timestamp.getTime();
        totalTime += diff;
      }
      avgTimeBetweenHighRisk = Math.round(totalTime / (highRiskEvents.length - 1));
    }

    return {
      totalEvents,
      riskDistribution,
      ppeDistribution,
      emotionDistribution,
      avgTimeBetweenHighRiskMs: avgTimeBetweenHighRisk,
    };
  }
}

