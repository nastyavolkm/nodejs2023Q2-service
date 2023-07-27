import { Injectable, NotFoundException } from '@nestjs/common';
import { DataService } from '../data/data.service';

@Injectable()
export class FavAlbumsService {
  constructor(private dataService: DataService) {}
  public async addToFavs(id: string): Promise<void> {
    const album = this.dataService.getAlbumById(id);
    if (album) {
      await this.dataService.addAlbumToFavs(id);
    } else {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
  }

  public async deleteFromFavs(id: string): Promise<void> {
    const album = this.dataService.getAlbumById(id);
    if (!album) throw new NotFoundException(`Album with id ${id} not found`);
    await this.dataService.deleteAlbumFromFavs(id);
  }
}
