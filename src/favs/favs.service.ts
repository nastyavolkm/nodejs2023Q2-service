import { Injectable } from '@nestjs/common';
import { albums, artists, favs, tracks } from '../store';
import { FavoritesResponse } from './interfaces/favorites-response.interface';

@Injectable()
export class FavsService {
  public async getAll(): Promise<FavoritesResponse[]> {
    return favs.map(
      ({ artists: artistsIds, tracks: tracksIds, albums: albumsIds }) => {
        return {
          artists: artistsIds.map((id) =>
            artists.find((artist) => artist.id === id),
          ),
          tracks: tracksIds.map((id) =>
            tracks.find((track) => track.id === id),
          ),
          albums: albumsIds.map((id) =>
            albums.find((album) => album.id === id),
          ),
        };
      },
    );
  }
}
