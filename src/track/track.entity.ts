import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToOne(() => Artist, (artist) => artist.id, {
    onDelete: 'SET NULL',
  })
  artist: Artist | null;

  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => Album, (album) => album.id, {
    onDelete: 'SET NULL',
  })
  album: Album | null;

  @Column({ nullable: true })
  albumId: string | null;

  @Column()
  duration: number;
}
