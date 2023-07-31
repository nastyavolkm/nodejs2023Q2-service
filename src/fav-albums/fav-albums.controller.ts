import {
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavAlbumsService } from './fav-albums.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('favs/album')
@Controller()
export class FavAlbumsController {
  constructor(private favAlbumsService: FavAlbumsService) {}

  @Post(':id')
  async addToFavs(@Param('id', ParseUUIDPipe) id: string): Promise<boolean> {
    const added = await this.favAlbumsService.addToFavs(id);
    if (!added)
      throw new UnprocessableEntityException(`Album with id ${id} not found`);

    return added;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<boolean> {
    const deleted = await this.favAlbumsService.deleteFromFavs(id);
    if (deleted) return true;
    throw new NotFoundException(`Album with id ${id} not found`);
  }
}
