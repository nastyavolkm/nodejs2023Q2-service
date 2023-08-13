import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import Album from './album.entity';

@Injectable()
export class AlbumRepository extends Repository<Album> {
  constructor(private dataSource: DataSource) {
    super(Album, dataSource.createEntityManager());
  }

  async getFavoriteAlbums(): Promise<Album[]> {
    return this.createQueryBuilder('album')
      .select('album')
      .leftJoinAndSelect('album.artist', 'artist')
      .innerJoin('favorite_album', 'favorites', 'favorites.albumId = album.id')
      .getMany();
  }
}
