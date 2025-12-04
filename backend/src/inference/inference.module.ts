import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InferenceController } from './inference.controller';
import { InferenceService } from './inference.service';
import { InferenceProvider } from './providers/inference.provider';
import { MockProvider } from './providers/mock.provider';
import { InferenceGateway } from './inference.gateway';
import { Event, EventSchema } from './schemas/event.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }])],
  controllers: [InferenceController],
  providers: [
    InferenceService,
    { provide: InferenceProvider, useClass: MockProvider },
    MockProvider,
    InferenceGateway,
  ],
  exports: [InferenceService],
})
export class InferenceModule {}

