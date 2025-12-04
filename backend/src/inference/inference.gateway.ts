import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { InferenceService } from './inference.service';

interface StreamPayload {
  ts: string;
  frameId: string;
  overlay: {
    boxes: Array<[number, number, number, number]>;
    emotions: Array<{ label: string; score: number }>;
    risk: { level: 'LOW' | 'MEDIUM' | 'HIGH'; score: number };
  };
}

@WebSocketGateway({ cors: true })
export class InferenceGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private clientIntervals: Map<string, NodeJS.Timeout> = new Map();

  constructor(private readonly inferenceService: InferenceService) {
    console.log('[InferenceGateway] Constructor: InferenceService injetado');
  }

  private generateRandomBox(): [number, number, number, number] {
    const x1 = Math.floor(Math.random() * 200);
    const y1 = Math.floor(Math.random() * 200);
    const x2 = x1 + 50 + Math.floor(Math.random() * 100);
    const y2 = y1 + 50 + Math.floor(Math.random() * 100);
    return [x1, y1, x2, y2];
  }

  private generateRandomRiskLevel(): 'LOW' | 'MEDIUM' | 'HIGH' {
    const levels: ('LOW' | 'MEDIUM' | 'HIGH')[] = ['LOW', 'MEDIUM', 'HIGH'];
    return levels[Math.floor(Math.random() * levels.length)];
  }

  private generateStreamPayload(): StreamPayload {
    const riskLevel = this.generateRandomRiskLevel();
    const riskScores: { [key: string]: number } = {
      LOW: Math.random() * 0.3,
      MEDIUM: 0.3 + Math.random() * 0.4,
      HIGH: 0.7 + Math.random() * 0.3,
    };

    const emotions = [
      { label: 'happy', score: Math.random() },
      { label: 'stress', score: Math.random() },
      { label: 'neutral', score: Math.random() },
    ];

    return {
      ts: new Date().toISOString(),
      frameId: `frame-${Math.random().toString(36).substr(2, 9)}`,
      overlay: {
        boxes: [
          this.generateRandomBox(),
          this.generateRandomBox(),
          this.generateRandomBox(),
        ],
        emotions,
        risk: {
          level: riskLevel,
          score: riskScores[riskLevel],
        },
      },
    };
  }

  handleConnection(client: Socket) {
    console.log(`[InferenceGateway] Cliente conectado: ${client.id}`);

    // Inicia streaming de 500ms em 500ms para este cliente
    const interval = setInterval(async () => {
      try {
        // Gera o payload de streaming
        const payload = this.generateStreamPayload();

        // EMITE para o cliente via WebSocket
        client.emit('stream', payload);
        console.log(`[InferenceGateway] Stream enviado para ${client.id}`);

        // CRÍTICO: Persiste o evento no MongoDB via InferenceService
        // Mapeia o payload para o formato esperado por InferenceResult
        const mockResult = {
          risk: {
            level: payload.overlay.risk.level,
            score: payload.overlay.risk.score,
            reasons: ['operator-position', 'equipment-missing'],
          },
          emotions: payload.overlay.emotions,
          ppe: [
            { 
              class: 'helmet', 
              score: Math.random() * 0.5,
              bbox: [10, 20, 50, 80]
            },
            { 
              class: 'vest', 
              score: Math.random() * 0.7,
              bbox: [30, 100, 150, 250]
            },
          ],
          latency_ms: Math.floor(Math.random() * 100),
        };

        console.log('[InferenceGateway] Chamando inferenceService.saveEvent...');
        await this.inferenceService.saveEvent(mockResult);
        console.log('[InferenceGateway] Evento salvo com sucesso no MongoDB');
      } catch (error) {
        console.error('[InferenceGateway] ERRO ao persistir evento:', error);
      }
    }, 500);

    // Armazena o interval para limpeza posterior
    this.clientIntervals.set(client.id, interval);
  }

  handleDisconnect(client: Socket) {
    console.log(`[InferenceGateway] Cliente desconectado: ${client.id}`);

    // Limpa o interval para este cliente
    const interval = this.clientIntervals.get(client.id);
    if (interval) {
      clearInterval(interval);
      this.clientIntervals.delete(client.id);
    }
  }

  @SubscribeMessage('ping')
  handlePing(client: Socket, data: any): void {
    client.emit('pong', { ts: new Date().toISOString() });
  }
}
