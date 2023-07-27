import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DataService } from '../data/data.service';

@Injectable()
export class FavTracksService {
  constructor(private dataService: DataService) {}
  public async addToFavs(id: string): Promise<void> {
    const track = await this.dataService.getTrackById(id);
    if (track) {
      await this.dataService.addTrackToFavs(id);
    } else {
      throw new UnprocessableEntityException(`Track with id ${id} not found`);
    }
  }

  public async deleteFromFavs(id: string): Promise<void> {
    const track = await this.dataService.getTrackById(id);
    if (!track) throw new NotFoundException(`Track with id ${id} not found`);
    await this.dataService.deleteTrackFromFavs(id);
  }
}
