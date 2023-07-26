import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { albums } from '../store';
import { Album } from './interfaces/album.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  public async getAll(): Promise<Album[]> {
    return albums;
  }

  public async getById(id: string): Promise<Album> {
    const album = albums.find((album) => album.id === id);
    if (album) return album;
    throw new NotFoundException(`Album with id ${id} not found`);
  }

  public async create(album: CreateAlbumDto): Promise<Album> {
    const newAlbum = {
      id: uuidv4(),
      artistId: null,
      ...album,
    };
    albums.push(newAlbum);
    return newAlbum;
  }

  public async updateAlbum(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    const index = albums.findIndex((item) => item.id === id);
    if (index < 0) throw new NotFoundException(`Album with id ${id} not found`);

    const album = albums[index];
    albums[index] = {
      ...album,
      ...updateAlbumDto,
    };
    return albums[index];
  }

  public async delete(id: string): Promise<void> {
    const index = albums.findIndex((item) => item.id === id);
    if (index < 0) throw new NotFoundException(`Album with id ${id} not found`);
    albums.splice(index, 1);
  }
}
