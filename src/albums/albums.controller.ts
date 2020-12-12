import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumSearchDto } from './dto/album-search.dto';
import { AlbumDto } from './dto/album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('albums')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @Get()
  public getAlbums(@Query() albumSearchDto: AlbumSearchDto): Array<AlbumDto> {
    return this.albumsService.getAlbums(albumSearchDto);
  }

  @Get('/:id')
  public getAlbum(@Param('id') id: string): AlbumDto {
    return this.albumsService.getAlbum(id);
  }

  @Post()
  public createAlbum(@Body() album: CreateAlbumDto): AlbumDto {
    return this.albumsService.createAlbum(album);
  }

  @Delete('/:id')
  public deleteAlbum(@Param('id') id: string) {
    this.albumsService.deleteAlbum(id);
  }

  @Patch('/:id/score')
  public updateAlbumScore(
    @Param('id') id: string,
    @Body('score') score: number,
  ): AlbumDto {
    return this.albumsService.updateAlbumReview(id, score);
  }
}
