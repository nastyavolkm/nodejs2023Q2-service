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
import { FavArtistsService } from './fav-artists.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('favs/artist')
@Controller()
export class FavArtistsController {
  constructor(private favArtistsService: FavArtistsService) {}

  @Post(':id')
  async addToFavs(@Param('id', ParseUUIDPipe) id: string): Promise<boolean> {
    const added = await this.favArtistsService.addToFavs(id);
    if (!added)
      throw new UnprocessableEntityException(`Artist with id ${id} not found`);
    return added;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<boolean> {
    const deleted = await this.favArtistsService.deleteFromFavs(id);
    if (!deleted) throw new NotFoundException(`Artist with id ${id} not found`);
    return true;
  }
}
