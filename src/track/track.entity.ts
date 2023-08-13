import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Expose, Transform } from 'class-transformer';
import Artist from '../artist/artist.entity';
import Album from '../album/album.entity';

@Entity()
export class Track {
  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Artist, null, { onDelete: 'SET NULL', eager: true })
  @Expose({ name: 'artistId' })
  @Transform(({ value }) => (value ? value.id : null))
  artist: Artist | null;

  @ManyToOne(() => Album, null, { onDelete: 'SET NULL', eager: true })
  @Expose({ name: 'albumId' })
  @Transform(({ value }) => (value ? value.id : null))
  album: Album | null;

  @Column()
  duration: number;
}
