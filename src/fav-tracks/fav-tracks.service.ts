import { Injectable, NotFoundException } from '@nestjs/common';
import { favs, tracks } from '../store';

@Injectable()
export class FavTracksService {
  public async addToFavs(id: string): Promise<void> {
    const track = tracks.find((track) => track.id === id);
    if (track) {
      favs.tracks.push(id);
    } else {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
  }

  public async deleteFromFavs(id: string): Promise<void> {
    const index = tracks.findIndex((item) => item.id === id);
    if (index < 0) throw new NotFoundException(`Track with id ${id} not found`);
    const indexInFavs = favs.tracks.findIndex((itemId) => itemId === id);
    if (indexInFavs < 0)
      throw new NotFoundException(
        `Track with id ${id} not found in favorites tracks`,
      );
    favs.tracks.splice(index, 1);
  }
}
