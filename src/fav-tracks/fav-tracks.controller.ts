import {
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavTracksService } from './fav-tracks.service';

@Controller()
export class FavTracksController {
  constructor(private favTracksService: FavTracksService) {}

  @Post(':id')
  async addToFavs(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.favTracksService.addToFavs(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.favTracksService.deleteFromFavs(id);
  }
}
