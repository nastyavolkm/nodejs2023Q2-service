import {
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavArtistsService } from './fav-artists.service';

@Controller()
export class FavArtistsController {
  constructor(private favArtistsService: FavArtistsService) {}

  @Post(':id')
  async addToFavs(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.favArtistsService.addToFavs(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.favArtistsService.deleteFromFavs(id);
  }
}
