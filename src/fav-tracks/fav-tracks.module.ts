import { forwardRef, Module } from '@nestjs/common';
import { FavTracksController } from './fav-tracks.controller';
import { FavTracksService } from './fav-tracks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteTrack } from '../favs/favorite-track.entity';
import { TrackModule } from '../track/track.module';

@Module({
  controllers: [FavTracksController],
  providers: [FavTracksService],
  imports: [
    forwardRef(() => TrackModule),
    TypeOrmModule.forFeature([FavoriteTrack]),
  ],
})
export class FavTracksModule {}
