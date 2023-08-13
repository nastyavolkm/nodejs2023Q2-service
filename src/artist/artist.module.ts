import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Artist from './artist.entity';
import { ArtistRepository } from './artist-repository';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, ArtistRepository],
  imports: [TypeOrmModule.forFeature([Artist])],
  exports: [ArtistRepository],
})
export class ArtistModule {}
