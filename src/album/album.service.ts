import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Album } from './interfaces/album.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DataService } from '../data/data.service';

@Injectable()
export class AlbumService {
  constructor(private dataService: DataService) {}
  public async getAll(): Promise<Album[]> {
    return this.dataService.getAlbums();
  }

  public async getById(id: string): Promise<Album> {
    const album = await this.dataService.getAlbumById(id);
    if (album) return album;
    throw new NotFoundException(`Album with id ${id} not found`);
  }

  public async create(album: CreateAlbumDto): Promise<Album> {
    const newAlbum = {
      id: uuidv4(),
      artistId: null,
      ...album,
    };
    return this.dataService.createAlbum(newAlbum);
  }

  public async updateAlbum(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    const album = await this.dataService.getAlbumById(id);
    if (!album) throw new NotFoundException(`Album with id ${id} not found`);

    return this.dataService.updateAlbum(id, updateAlbumDto);
  }

  public async delete(id: string): Promise<void> {
    return this.dataService.deleteAlbum(id);
  }
}
