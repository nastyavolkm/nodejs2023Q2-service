import { Controller, Delete, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { FavAlbumsService } from './fav-albums.service';

@Controller()
export class FavAlbumsController {
  constructor(private favAlbumsService: FavAlbumsService) {}

  @Post(':id')
  async addToFavs(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.favAlbumsService.addToFavs(id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.favAlbumsService.deleteFromFavs(id);
  }
}
