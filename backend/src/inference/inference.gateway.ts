import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface StreamPayload {
  ts: string;
  frameId: string;
  overlay: {
    boxes: number[][];
    emotions: { label: string; score: number }[];
    risk: { level: 'LOW' | 'MEDIUM' | 'HIGH'; score: number };
  };
}

@WebSocketGateway({ cors: true })
export class InferenceGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private clientIntervals: Map<string, NodeJS.Timeout> = new Map();

  private generateRandomBox(): number[] {
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

    return {
      ts: new Date().toISOString(),
      frameId: `frame-${Math.random().toString(36).substr(2, 9)}`,
      overlay: {
        boxes: [
          this.generateRandomBox(),
          this.generateRandomBox(),
          this.generateRandomBox(),
        ],
        emotions: [
          { label: 'happy', score: Math.random() },
          { label: 'stress', score: Math.random() },
          { label: 'neutral', score: Math.random() },
        ],
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
    const interval = setInterval(() => {
      const payload = this.generateStreamPayload();
      client.emit('stream', payload);
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
