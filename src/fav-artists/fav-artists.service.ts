import { Injectable, NotFoundException } from '@nestjs/common';
import { artists, favs } from '../store';

@Injectable()
export class FavArtistsService {
  public async addToFavs(id: string): Promise<void> {
    const artist = artists.find((artist) => artist.id === id);
    if (artist) {
      favs.artists.push(id);
    } else {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
  }

  public async deleteFromFavs(id: string): Promise<void> {
    const index = artists.findIndex((item) => item.id === id);
    if (index < 0)
      throw new NotFoundException(`Artist with id ${id} not found`);
    const indexInFavs = favs.artists.findIndex((itemId) => itemId === id);
    if (indexInFavs < 0)
      throw new NotFoundException(
        `Artist with id ${id} not found in favorites artists`,
      );
    favs.artists.splice(index, 1);
  }
}
