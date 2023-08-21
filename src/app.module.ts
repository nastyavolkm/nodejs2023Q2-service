import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
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
import { APP_FILTER, RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db/data-source';
import { LoggerMiddleware } from './logger/logger.middleware';
import { LoggingModule } from './logger/logging/logging.module';
import { HttpExceptionFilter } from './logger/logging/http-exception.filter';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavsModule,
    FavArtistsModule,
    FavTracksModule,
    FavAlbumsModule,
    LoggingModule,
    AuthModule,
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
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
