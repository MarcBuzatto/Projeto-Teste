import { Module } from '@nestjs/common';
import { InferenceController } from './inference.controller';
import { InferenceService } from './inference.service';
import { InferenceProvider } from './providers/inference.provider';
import { MockProvider } from './providers/mock.provider';

@Module({
  controllers: [InferenceController],
  providers: [
    InferenceService,
    { provide: InferenceProvider, useClass: MockProvider },
    MockProvider,
  ],
  exports: [InferenceService],
})
export class InferenceModule {}
