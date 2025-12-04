import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { InferenceService } from './inference.service';
import { InferenceResult } from './interfaces/inference-result.interface';

@Controller('inference')
export class InferenceController {
  constructor(private readonly inferenceService: InferenceService) {}

  @Post('frames')
  @HttpCode(200)
  async analyzeFrame(@Body() body: any): Promise<InferenceResult> {
    // body pode conter campos como { frame: <dados> }
    const frame = body?.frame ?? body;
    return this.inferenceService.analyzeFrame(frame);
  }
}
