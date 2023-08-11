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
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
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
