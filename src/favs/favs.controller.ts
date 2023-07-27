import { Controller, Get } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavoritesResponse } from './interfaces/favorites-response.interface';

@Controller()
export class FavsController {
  constructor(private favsService: FavsService) {}

  @Get()
  async findAll(): Promise<FavoritesResponse> {
    return this.favsService.getAll();
  }
}
