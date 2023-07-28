import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Track } from './dto/track.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DataService } from '../data/data.service';

@Injectable()
export class TrackService {
  constructor(private dataService: DataService) {}
  public async getAll(): Promise<Track[]> {
    return this.dataService.getTracks();
  }

  public async getById(id: string): Promise<Track> {
    const track = await this.dataService.getTrackById(id);
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
    try {
      return await this.dataService.createTrack(newTrack);
    } catch {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  public async updateTrack(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    const track = await this.dataService.getTrackById(id);
    if (!track) throw new NotFoundException(`Track with id ${id} not found`);
    return this.dataService.updateTrack(id, updateTrackDto);
  }

  public async delete(id: string): Promise<void> {
    await this.dataService.deleteTrack(id);
  }
}
