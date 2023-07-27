import { Injectable, NotFoundException } from '@nestjs/common';
import { albums, favs } from '../store';

@Injectable()
export class FavAlbumsService {
  public async addToFavs(id: string): Promise<void> {
    const album = albums.find((album) => album.id === id);
    if (album) {
      favs.albums.push(id);
    } else {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
  }

  public async deleteFromFavs(id: string): Promise<void> {
    const index = albums.findIndex((item) => item.id === id);
    if (index < 0) throw new NotFoundException(`Album with id ${id} not found`);
    const indexInFavs = favs.albums.findIndex((itemId) => itemId === id);
    if (indexInFavs < 0)
      throw new NotFoundException(
        `Album with id ${id} not found in favorites artists`,
      );
    favs.albums.splice(index, 1);
  }
}
