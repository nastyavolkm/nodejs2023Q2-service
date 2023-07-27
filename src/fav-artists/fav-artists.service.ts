import { Injectable, NotFoundException } from '@nestjs/common';
import { DataService } from '../data/data.service';

@Injectable()
export class FavArtistsService {
  constructor(private dataService: DataService) {}
  public async addToFavs(id: string): Promise<void> {
    const artist = this.dataService.getArtistById(id);
    if (artist) {
      await this.dataService.addArtistToFavs(id);
    } else {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
  }

  public async deleteFromFavs(id: string): Promise<void> {
    const artist = this.dataService.getArtistById(id);
    if (!artist) throw new NotFoundException(`Artist with id ${id} not found`);
    await this.dataService.deleteArtistFromFavs(id);
  }
}
