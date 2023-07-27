import { Injectable } from '@nestjs/common';
import { albums, artists, favs, tracks } from '../store';
import { FavoritesResponse } from './interfaces/favorites-response.interface';

@Injectable()
export class FavsService {
  public async getAll(): Promise<FavoritesResponse> {
    const { artists: artistsIds, tracks: tracksIds, albums: albumsIds } = favs;
    return {
      ...favs,
      artists: artistsIds.map((id) =>
        artists.find((artist) => artist.id === id),
      ),
      tracks: tracksIds.map((id) => tracks.find((track) => track.id === id)),
      albums: albumsIds.map((id) => albums.find((album) => album.id === id)),
    };
  }
}
