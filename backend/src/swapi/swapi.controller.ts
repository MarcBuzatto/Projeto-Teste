import { Controller, Get } from '@nestjs/common';
import { SwapiService } from './swapi.service';

@Controller('swapi')
export class SwapiController {
  constructor(private readonly swapiService: SwapiService) {}

  @Get('people')
  async findAllPeople() {
    return this.swapiService.findAllPeople();
  }

  @Get('planets')
  async findAllPlanets() {
    return this.swapiService.findAllPlanets();
  }
}
