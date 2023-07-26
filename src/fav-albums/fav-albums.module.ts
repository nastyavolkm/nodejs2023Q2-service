import { Module } from '@nestjs/common';
import { FavAlbumsController } from './fav-albums.controller';
import { FavAlbumsService } from './fav-albums.service';

@Module({
  controllers: [FavAlbumsController],
  providers: [FavAlbumsService],
})
export class FavAlbumsModule {}
