import { Injectable } from '@nestjs/common';
import { FavoritesResponse } from './dto/favorites-response.dto';
import { AlbumRepository } from '../album/album-repository';
import { ArtistRepository } from '../artist/artist-repository';
import { TrackRepository } from '../track/track-repository';

@Injectable()
export class FavsService {
  constructor(
    private albumRepository: AlbumRepository,
    private artistRepository: ArtistRepository,
    private trackRepository: TrackRepository,
  ) {}
  public async getAll(): Promise<FavoritesResponse> {
    return {
      artists: await this.artistRepository.getFavoriteArtists(),
      tracks: await this.trackRepository.getFavoriteTracks(),
      albums: await this.albumRepository.getFavoriteAlbums(),
    };
  }
}
