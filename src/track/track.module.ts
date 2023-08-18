import { forwardRef, Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './track.entity';
import { TrackRepository } from './track-repository';
import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';
import Artist from '../artist/artist.entity';
import Album from '../album/album.entity';

@Module({
  controllers: [TrackController],
  providers: [TrackService, TrackRepository],
  imports: [
    forwardRef(() => AlbumModule),
    forwardRef(() => ArtistModule),
    TypeOrmModule.forFeature([Track, Artist, Album]),
  ],
  exports: [TrackRepository],
})
export class TrackModule {}
