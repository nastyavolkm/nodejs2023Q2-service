import { Module } from '@nestjs/common';
import { FavArtistsController } from './fav-artists.controller';
import { FavArtistsService } from './fav-artists.service';

@Module({
  controllers: [FavArtistsController],
  providers: [FavArtistsService],
})
export class FavArtistsModule {}
