import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Event extends Document {
  @Prop({ type: Date, required: true, index: true })
  timestamp: Date;

  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: String, enum: ['LOW', 'MEDIUM', 'HIGH'], index: true })
  riskLevel: string;

  @Prop({ type: Object, required: true })
  providerResult: {
    emotions: { label: string; score: number }[];
    ppe: { class: string; score: number; bbox: number[] }[];
    risk: { level: 'LOW' | 'MEDIUM' | 'HIGH'; score: number; reasons: string[] };
    latency_ms: number;
  };
}

export const EventSchema = SchemaFactory.createForClass(Event);

// Índices para otimização
EventSchema.index({ riskLevel: 1 });
EventSchema.index({ timestamp: -1 });
EventSchema.index({ 'providerResult.ppe.class': 1 });
EventSchema.index({ 'providerResult.emotions.label': 1 });
