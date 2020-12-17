import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { AlbumsService } from '../services/albums.service';
import { AlbumSearchDto } from '../dto/album-search.dto';
import { AlbumDto } from '../dto/album.dto';
import { CreateAlbumDto } from '../dto/create-album.dto';

@Controller('albums')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @Get('/:id')
  public async getAlbum(@Param('id', ParseIntPipe) id: number): Promise<AlbumDto> {
    return this.albumsService.getAlbum(id);
  }

  @Get()
  public async getAlbums(@Query() albumSearchDto: AlbumSearchDto): Promise<Array<AlbumDto>> {
    return await this.albumsService.getAlbums(albumSearchDto);
  }

  @Post()
  public async createAlbum(@Body(ValidationPipe) album: CreateAlbumDto): Promise<AlbumDto> {
    return await this.albumsService.createAlbum(album);
  }

  @Delete('/:id')
  public async deleteAlbum(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.albumsService.deleteAlbum(id);
  }

  @Patch('/:id/score')
  public async updateAlbumScore(
    @Param('id', ParseIntPipe) id: number,
    @Body('score') score: number,
  ): Promise<AlbumDto> {
    return await this.albumsService.updateAlbumScore(id, score);
  }
}
