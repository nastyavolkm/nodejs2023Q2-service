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
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ApiTags } from '@nestjs/swagger';
import { Track } from './track.entity';
import { NotFoundError } from '../logger/not-found-error';

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
    try {
      return await this.trackService.getById(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    try {
      return await this.trackService.create(createTrackDto);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  @Put(':id')
  async update(
    @Body() updateTrackDto: UpdateTrackDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Track> {
    try {
      return await this.trackService.updateTrack(id, updateTrackDto);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    try {
      await this.trackService.delete(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
