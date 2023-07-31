import { Injectable } from '@nestjs/common';
import { DataService } from '../data/data.service';

@Injectable()
export class FavArtistsService {
  constructor(private dataService: DataService) {}
  public async addToFavs(id: string): Promise<boolean> {
    const artist = await this.dataService.getArtistById(id);
    if (artist) {
      return this.dataService.addArtistToFavs(id);
    } else {
      return false;
    }
  }

  public async deleteFromFavs(id: string): Promise<boolean | undefined> {
    const artist = await this.dataService.getArtistById(id);
    if (!artist) return undefined;
    await this.dataService.deleteArtistFromFavs(id);
    return true;
  }
}
