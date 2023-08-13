import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteTrack } from '../favs/favorite-track.entity';
import { Repository } from 'typeorm';
import { TrackRepository } from '../track/track-repository';
import { NotFoundError } from '../errors/not-found-error';
import { InternalError } from '../errors/internal-error';

@Injectable()
export class FavTracksService {
  constructor(
    @InjectRepository(FavoriteTrack)
    private favTrackRepository: Repository<FavoriteTrack>,
    private trackRepository: TrackRepository,
  ) {}
  public async addToFavs(id: string): Promise<boolean> {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) throw new NotFoundError('Track', id);
    try {
      await this.favTrackRepository.save(track);
      return true;
    } catch {
      throw new InternalError();
    }
  }

  public async deleteFromFavs(id: string): Promise<boolean> {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) throw new NotFoundError('Track', id);
    try {
      await this.favTrackRepository.delete(id);
      return true;
    } catch {
      throw new InternalError();
    }
  }
}
