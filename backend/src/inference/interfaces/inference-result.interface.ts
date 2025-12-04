export interface InferenceResult {
  emotions: { label: string; score: number }[];
  ppe: { class: string; score: number; bbox: number[] }[];
  risk: { level: 'LOW' | 'MEDIUM' | 'HIGH'; score: number; reasons: string[] };
  latency_ms: number;
}
