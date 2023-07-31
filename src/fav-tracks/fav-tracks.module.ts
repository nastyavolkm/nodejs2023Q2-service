import { Module } from '@nestjs/common';
import { FavTracksController } from './fav-tracks.controller';
import { FavTracksService } from './fav-tracks.service';
import { DataModule } from '../data/data.module';

@Module({
  controllers: [FavTracksController],
  providers: [FavTracksService],
  imports: [DataModule],
})
export class FavTracksModule {}
