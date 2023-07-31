import { Injectable } from '@nestjs/common';
import { DataService } from '../data/data.service';

@Injectable()
export class FavTracksService {
  constructor(private dataService: DataService) {}
  public async addToFavs(id: string): Promise<boolean> {
    const track = await this.dataService.getTrackById(id);
    if (track) {
      return this.dataService.addTrackToFavs(id);
    } else {
      return false;
    }
  }

  public async deleteFromFavs(id: string): Promise<boolean | undefined> {
    const track = await this.dataService.getTrackById(id);
    if (!track) return undefined;
    await this.dataService.deleteTrackFromFavs(id);
    return true;
  }
}
