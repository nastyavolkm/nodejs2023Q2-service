import { forwardRef, Module } from '@nestjs/common';
import { FavAlbumsController } from './fav-albums.controller';
import { FavAlbumsService } from './fav-albums.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteAlbum } from '../favs/favorite-album.entity';
import { AlbumModule } from '../album/album.module';

@Module({
  controllers: [FavAlbumsController],
  providers: [FavAlbumsService],
  imports: [
    forwardRef(() => AlbumModule),
    TypeOrmModule.forFeature([FavoriteAlbum]),
  ],
})
export class FavAlbumsModule {}
