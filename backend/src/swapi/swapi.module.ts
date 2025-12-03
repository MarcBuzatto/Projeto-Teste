import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SwapiController } from './swapi.controller';
import { SwapiService } from './swapi.service';

@Module({
  imports: [HttpModule],
  controllers: [SwapiController],
  providers: [SwapiService],
  exports: [SwapiService],
})
export class SwapiModule {}
