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
import { AlbumService } from './album.service';
import { Album } from './dto/album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('album')
@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  async findAll(): Promise<Album[]> {
    return this.albumService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Album> {
    const album = await this.albumService.getById(id);
    if (album) return album;
    throw new NotFoundException(`Album with id ${id} not found`);
  }

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  async update(
    @Body() updateAlbumDto: UpdateAlbumDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Album> {
    const album = await this.albumService.updateAlbum(id, updateAlbumDto);
    if (album) return album;
    throw new NotFoundException(`Album with id ${id} not found`);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.albumService.delete(id);
  }
}
