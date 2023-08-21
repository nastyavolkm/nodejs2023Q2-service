import { Controller, Get, UseGuards } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavoritesResponse } from './dto/favorites-response.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@ApiTags('favs')
@Controller()
export class FavsController {
  constructor(private favsService: FavsService) {}

  @Get()
  async findAll(): Promise<FavoritesResponse> {
    return this.favsService.getAll();
  }
}
