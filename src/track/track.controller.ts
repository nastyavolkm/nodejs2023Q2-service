import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { Track } from './dto/track.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('track')
@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  async findAll(): Promise<Track[]> {
    return this.trackService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Track> {
    const track = await this.trackService.getById(id);
    if (track) return track;
    throw new NotFoundException(`Track with id ${id} not found`);
  }

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    const track = await this.trackService.create(createTrackDto);
    if (track) return track;
    throw new InternalServerErrorException('Something went wrong');
  }

  @Put(':id')
  async update(
    @Body() updateTrackDto: UpdateTrackDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Track> {
    const track = await this.trackService.updateTrack(id, updateTrackDto);
    if (track) return track;
    throw new NotFoundException(`Track with id ${id} not found`);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.trackService.delete(id);
  }
}
