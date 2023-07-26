import { Injectable, NotFoundException } from '@nestjs/common';
import { artists } from '../store';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from './interfaces/artist.interface';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  public async getAll(): Promise<Artist[]> {
    return artists;
  }

  public async getById(id: string): Promise<Artist> {
    const artist = artists.find((artist) => artist.id === id);
    if (artist) return artist;
    throw new NotFoundException(`Artist with id ${id} not found`);
  }

  public async create(artist: CreateArtistDto): Promise<Artist> {
    const newArtist = {
      id: uuidv4(),
      ...artist,
    };
    artists.push(newArtist);
    return newArtist;
  }

  public async updateArtist(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    const index = artists.findIndex((item) => item.id === id);
    if (index < 0)
      throw new NotFoundException(`Artist with id ${id} not found`);

    const artist = artists[index];
    artists[index] = {
      ...artist,
      ...updateArtistDto,
    };
    return artists[index];
  }

  public async delete(id: string): Promise<void> {
    const index = artists.findIndex((item) => item.id === id);
    if (index < 0)
      throw new NotFoundException(`Artist with id ${id} not found`);
    artists.splice(index, 1);
  }
}
