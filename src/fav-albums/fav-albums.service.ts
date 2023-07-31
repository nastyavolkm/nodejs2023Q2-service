import { Injectable } from '@nestjs/common';
import { DataService } from '../data/data.service';

@Injectable()
export class FavAlbumsService {
  constructor(private dataService: DataService) {}
  public async addToFavs(id: string): Promise<boolean> {
    const album = await this.dataService.getAlbumById(id);
    if (album) {
      return this.dataService.addAlbumToFavs(id);
    } else {
      return false;
    }
  }

  public async deleteFromFavs(id: string): Promise<boolean | undefined> {
    const album = await this.dataService.getAlbumById(id);
    if (!album) return undefined;
    await this.dataService.deleteAlbumFromFavs(id);
    return true;
  }
}
