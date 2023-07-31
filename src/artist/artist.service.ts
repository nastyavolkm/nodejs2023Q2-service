import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from './dto/artist.dto';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DataService } from '../data/data.service';

@Injectable()
export class ArtistService {
  constructor(private dataService: DataService) {}
  public async getAll(): Promise<Artist[]> {
    return this.dataService.getArtists();
  }

  public async getById(id: string): Promise<Artist> {
    const artist = await this.dataService.getArtistById(id);
    if (artist) return artist;
    return undefined;
  }

  public async create(artist: CreateArtistDto): Promise<Artist> {
    const newArtist = {
      id: uuidv4(),
      ...artist,
    };
    return this.dataService.createArtist(newArtist);
  }

  public async updateArtist(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    const artist = await this.dataService.getArtistById(id);
    if (!artist) return undefined;

    return this.dataService.updateArtist(id, updateArtistDto);
  }

  public async delete(id: string): Promise<void> {
    await this.dataService.deleteArtist(id);
  }
}
