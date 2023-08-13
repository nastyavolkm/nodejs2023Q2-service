import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { NotFoundError } from '../errors/not-found-error';
import { TrackRepository } from './track-repository';
import { Track } from './track.entity';
import { ArtistRepository } from '../artist/artist-repository';
import { AlbumRepository } from '../album/album-repository';

@Injectable()
export class TrackService {
  constructor(
    private trackRepository: TrackRepository,
    private artistRepository: ArtistRepository,
    private albumRepository: AlbumRepository,
  ) {}
  public async getAll(): Promise<Track[]> {
    return this.trackRepository.find();
  }

  public async getById(id: string): Promise<Track> {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) throw new NotFoundError('Track', id);
    return track;
  }

  public async create(track: CreateTrackDto): Promise<Track> {
    const { name, duration, artistId, albumId } = track;
    const artist = artistId
      ? await this.artistRepository.findOne({ where: { id: artistId } })
      : null;
    const album = albumId
      ? await this.albumRepository.findOne({ where: { id: albumId } })
      : null;

    return await this.trackRepository.save(
      new Track({
        name,
        duration,
        artist,
        album,
      }),
    );
  }

  public async updateTrack(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) throw new NotFoundError('Track', id);
    const newTrack = { ...track, ...updateTrackDto };
    return await this.trackRepository.save(newTrack);
  }

  public async delete(id: string): Promise<void> {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) throw new NotFoundError('Track', id);
    await this.trackRepository.delete(id);
  }
}
