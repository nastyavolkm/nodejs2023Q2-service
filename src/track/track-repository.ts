import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Track } from './track.entity';

@Injectable()
export class TrackRepository extends Repository<Track> {
  constructor(private dataSource: DataSource) {
    super(Track, dataSource.createEntityManager());
  }

  async getFavoriteTracks(): Promise<Track[]> {
    return this.createQueryBuilder('track')
      .select('track')
      .leftJoinAndSelect('track.artist', 'artist')
      .leftJoinAndSelect('track.album', 'album')
      .innerJoin('favorite_track', 'favorites', 'favorites.trackId = track.id')
      .getMany();
  }
}
