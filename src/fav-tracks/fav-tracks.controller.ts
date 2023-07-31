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
import { FavTracksService } from './fav-tracks.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('favs/track')
@Controller()
export class FavTracksController {
  constructor(private favTracksService: FavTracksService) {}

  @Post(':id')
  async addToFavs(@Param('id', ParseUUIDPipe) id: string): Promise<boolean> {
    const added = await this.favTracksService.addToFavs(id);
    if (!added)
      throw new UnprocessableEntityException(`Track with id ${id} not found`);
    return added;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<boolean> {
    const track = await this.favTracksService.deleteFromFavs(id);
    if (!track) throw new NotFoundException(`Track with id ${id} not found`);
    return true;
  }
}
