import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavsModule } from './favs/favs.module';
import { FavArtistsModule } from './fav-artists/fav-artists.module';
import { FavTracksModule } from './fav-tracks/fav-tracks.module';
import { FavAlbumsModule } from './fav-albums/fav-albums.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavsModule,
    FavArtistsModule,
    FavTracksModule,
    FavAlbumsModule,
    RouterModule.register([
      {
        path: 'favs',
        module: FavsModule,
        children: [
          {
            path: 'album',
            module: FavAlbumsModule,
          },
          {
            path: 'artist',
            module: FavArtistsModule,
          },
          {
            path: 'track',
            module: FavTracksModule,
          },
        ],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
