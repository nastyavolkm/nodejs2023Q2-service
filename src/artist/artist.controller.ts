import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Artist } from './dto/artist.dto';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('artist')
@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  async findAll(): Promise<Artist[]> {
    return this.artistService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Artist> {
    const artist = await this.artistService.getById(id);
    if (artist) return artist;
    throw new NotFoundException(`Artist with id ${id} not found`);
  }

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  async update(
    @Body() updateArtistDto: UpdateArtistDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Artist> {
    const artist = await this.artistService.updateArtist(id, updateArtistDto);
    if (artist) return artist;
    throw new NotFoundException(`Artist with id ${id} not found`);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.artistService.delete(id);
  }
}
