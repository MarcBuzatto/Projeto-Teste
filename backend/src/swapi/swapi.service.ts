import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SwapiService {
  private readonly baseUrl = 'https://swapi.dev/api';

  constructor(private readonly httpService: HttpService) {}

  async findAllPeople() {
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/people`),
    );
    return response.data;
  }

  async findAllPlanets() {
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/planets`),
    );
    return response.data;
  }
}
