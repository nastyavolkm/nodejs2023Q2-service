import { forwardRef, Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Album from './album.entity';
import { AlbumRepository } from './album-repository';
import { ArtistModule } from '../artist/artist.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, AlbumRepository],
  imports: [forwardRef(() => ArtistModule), TypeOrmModule.forFeature([Album])],
  exports: [AlbumRepository],
})
export class AlbumModule {}
