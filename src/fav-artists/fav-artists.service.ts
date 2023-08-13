import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteArtist } from '../favs/favorite-artist.entity';
import { ArtistRepository } from '../artist/artist-repository';
import { NotFoundError } from '../errors/not-found-error';
import { InternalError } from '../errors/internal-error';

@Injectable()
export class FavArtistsService {
  constructor(
    @InjectRepository(FavoriteArtist)
    private favArtistRepository: Repository<FavoriteArtist>,
    private artistRepository: ArtistRepository,
  ) {}
  public async addToFavs(id: string): Promise<boolean> {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) throw new NotFoundError('Artist', id);
    try {
      await this.favArtistRepository.save(artist);
      return true;
    } catch {
      throw new InternalError();
    }
  }

  public async deleteFromFavs(id: string): Promise<boolean | undefined> {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) throw new NotFoundError('Artist', id);
    try {
      await this.favArtistRepository.delete(id);
      return true;
    } catch {
      throw new InternalError();
    }
  }
}
