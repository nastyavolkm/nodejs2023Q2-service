import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import Album from './album.entity';
import { NotFoundError } from '../logger/not-found-error';
import { AlbumRepository } from './album-repository';
import { ArtistRepository } from '../artist/artist-repository';

@Injectable()
export class AlbumService {
  constructor(
    private albumRepository: AlbumRepository,
    private artistRepository: ArtistRepository,
  ) {}
  public async getAll(): Promise<Album[]> {
    return this.albumRepository.find();
  }

  public async getById(id: string): Promise<Album> {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) throw new NotFoundError('Album', id);
    return album;
  }

  public async create(album: CreateAlbumDto): Promise<Album> {
    const { name, year, artistId } = album;
    const artist = artistId
      ? await this.artistRepository.findOne({
          where: { id: artistId },
        })
      : null;
    const albumToCreate = new Album({ name, year, artist });
    return await this.albumRepository.save(albumToCreate);
  }

  public async updateAlbum(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) throw new NotFoundError('Album', id);

    const updatedAlbum = {
      ...album,
      ...updateAlbumDto,
    } as Album;

    return await this.albumRepository.save(updatedAlbum);
  }

  public async delete(id: string): Promise<void> {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) throw new NotFoundError('Album', id);
    await this.albumRepository.delete(id);
  }
}
