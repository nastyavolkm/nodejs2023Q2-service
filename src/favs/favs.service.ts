import { Injectable } from '@nestjs/common';
import { FavoritesResponse } from './interfaces/favorites-response.interface';
import { DataService } from '../data/data.service';

@Injectable()
export class FavsService {
  constructor(private dataService: DataService) {}
  public async getAll(): Promise<FavoritesResponse> {
    const {
      artists: artistsIds,
      tracks: tracksIds,
      albums: albumsIds,
    } = await this.dataService.getFavs();
    return {
      artists: await Promise.all(
        artistsIds.map(async (id) => this.dataService.getArtistById(id)),
      ),
      tracks: await Promise.all(
        tracksIds.map(async (id) => this.dataService.getTrackById(id)),
      ),
      albums: await Promise.all(
        albumsIds.map(async (id) => this.dataService.getAlbumById(id)),
      ),
    };
  }
}
