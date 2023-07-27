import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { DataModule } from '../data/data.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [DataModule],
})
export class ArtistModule {}
