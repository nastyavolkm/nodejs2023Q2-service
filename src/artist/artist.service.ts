import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import Artist from './artist.entity';
import { NotFoundError } from '../logger/not-found-error';
import { ArtistRepository } from './artist-repository';

@Injectable()
export class ArtistService {
  constructor(private artistRepository: ArtistRepository) {}
  public async getAll(): Promise<Artist[]> {
    return this.artistRepository.find();
  }

  public async getById(id: string): Promise<Artist> {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) throw new NotFoundError('Artist', id);
    return artist;
  }

  public async create(artist: CreateArtistDto): Promise<Artist> {
    return await this.artistRepository.save(artist);
  }

  public async updateArtist(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) throw new NotFoundError('Artist', id);

    return await this.artistRepository.save({
      ...artist,
      ...updateArtistDto,
    });
  }

  public async delete(id: string): Promise<void> {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) throw new NotFoundError('Artist', id);
    await this.artistRepository.delete(id);
  }
}
