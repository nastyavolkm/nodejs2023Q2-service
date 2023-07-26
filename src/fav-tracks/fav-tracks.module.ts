import { Module } from '@nestjs/common';
import { FavTracksController } from './fav-tracks.controller';
import { FavTracksService } from './fav-tracks.service';

@Module({
  controllers: [FavTracksController],
  providers: [FavTracksService],
})
export class FavTracksModule {}
