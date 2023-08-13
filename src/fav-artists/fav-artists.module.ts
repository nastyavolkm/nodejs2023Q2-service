import { forwardRef, Module } from '@nestjs/common';
import { FavArtistsController } from './fav-artists.controller';
import { FavArtistsService } from './fav-artists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteArtist } from '../favs/favorite-artist.entity';
import { ArtistModule } from '../artist/artist.module';

@Module({
  controllers: [FavArtistsController],
  providers: [FavArtistsService],
  imports: [
    forwardRef(() => ArtistModule),
    TypeOrmModule.forFeature([FavoriteArtist]),
  ],
})
export class FavArtistsModule {}
