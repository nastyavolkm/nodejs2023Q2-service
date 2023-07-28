import { Controller, Get } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavoritesResponse } from './dto/favorites-response.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('favs')
@Controller()
export class FavsController {
  constructor(private favsService: FavsService) {}

  @Get()
  async findAll(): Promise<FavoritesResponse> {
    return this.favsService.getAll();
  }
}
