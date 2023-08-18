import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteTrack } from './favorite-track.entity';
import { FavoriteAlbum } from './favorite-album.entity';
import { FavoriteArtist } from './favorite-artist.entity';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [
    TrackModule,
    AlbumModule,
    ArtistModule,
    TypeOrmModule.forFeature([FavoriteTrack, FavoriteAlbum, FavoriteArtist]),
  ],
})
export class FavsModule {}
