import { ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Track } from '../track/track.entity';

export class FavoriteTrack {
  constructor(track: Track) {
    this.track = track;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Track, null, { onDelete: 'CASCADE', eager: true })
  track: Track;
}
