import { Injectable, NotFoundException } from '@nestjs/common';
import { tracks } from '../store';
import { v4 as uuidv4 } from 'uuid';
import { Track } from './interfaces/track.interface';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  public async getAll(): Promise<Track[]> {
    return tracks;
  }

  public async getById(id: string): Promise<Track> {
    const track = tracks.find((track) => track.id === id);
    if (track) return track;
    throw new NotFoundException(`Track with id ${id} not found`);
  }

  public async create(track: CreateTrackDto): Promise<Track> {
    const newTrack = {
      id: uuidv4(),
      artistId: null,
      albumId: null,
      ...track,
    };
    tracks.push(newTrack);
    return newTrack;
  }

  public async updateTrack(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    const index = tracks.findIndex((item) => item.id === id);
    if (index < 0) throw new NotFoundException(`Track with id ${id} not found`);

    const track = tracks[index];
    tracks[index] = {
      ...track,
      ...updateTrackDto,
    };
    return tracks[index];
  }

  public async delete(id: string): Promise<void> {
    const index = tracks.findIndex((item) => item.id === id);
    if (index < 0) throw new NotFoundException(`Track with id ${id} not found`);
    tracks.splice(index, 1);
  }
}
