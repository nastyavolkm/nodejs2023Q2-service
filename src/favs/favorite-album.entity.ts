import { ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Album from '../album/album.entity';

export class FavoriteAlbum {
  constructor(album: Album) {
    this.album = album;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Album, null, { onDelete: 'CASCADE', eager: true })
  album: Album;
}
