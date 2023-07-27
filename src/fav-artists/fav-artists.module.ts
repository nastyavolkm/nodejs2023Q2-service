import { Module } from '@nestjs/common';
import { FavArtistsController } from './fav-artists.controller';
import { FavArtistsService } from './fav-artists.service';
import { DataModule } from '../data/data.module';

@Module({
  controllers: [FavArtistsController],
  providers: [FavArtistsService],
  imports: [DataModule],
})
export class FavArtistsModule {}
