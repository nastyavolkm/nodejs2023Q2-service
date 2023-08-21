import {
  Controller,
  Delete,
  HttpCode,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { FavAlbumsService } from './fav-albums.service';
import { ApiTags } from '@nestjs/swagger';
import { NotFoundError } from '../logger/not-found-error';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@ApiTags('favs/album')
@Controller()
export class FavAlbumsController {
  constructor(private favAlbumsService: FavAlbumsService) {}

  @Post(':id')
  async addToFavs(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    try {
      await this.favAlbumsService.addToFavs(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new UnprocessableEntityException(error.message);
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    try {
      await this.favAlbumsService.deleteFromFavs(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
