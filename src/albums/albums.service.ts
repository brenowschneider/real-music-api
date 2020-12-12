import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { AlbumDto } from './dto/album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AlbumGender } from './enums/album-gender.enum';
import { v4 as uuidv4 } from 'uuid';
import { AlbumSearchDto } from './dto/album-search.dto';

@Injectable()
export class AlbumsService {
  private albums: Array<AlbumDto> = [
    {
      id: '25baff02-7fcd-41c2-9a3a-f0f871f95645',
      author: 'Angra',
      title: 'Temple Of Shadows',
      year: 2004,
      gender: AlbumGender.METAL,
      reviewScore: 4.6,
    },
    {
      id: '9190326e-f371-4251-b24c-2a9333bfb982',
      author: 'Shaman',
      title: 'Ritual',
      year: 2001,
      gender: AlbumGender.METAL,
      reviewScore: 4.2,
    },
    {
      id: 'ec15b4fd-3db1-4c88-9dc1-f8c2686f4300',
      author: 'Led Zeppelin',
      title: 'IV',
      year: 1971,
      gender: AlbumGender.ROCK,
      reviewScore: 4.7,
    },
    {
      id: '85c4d7ac-d3a5-40bb-aa50-a80149faff6a',
      author: 'Bon Jovi',
      title: 'Slippery When Wet',
      year: 1986,
      gender: AlbumGender.ROCK,
      reviewScore: 4.5,
    },
    {
      id: '210e61a5-2c78-468f-9483-1ee655b04991',
      author: 'Iron Maiden',
      title: 'Fear Of The Dark',
      year: 1992,
      gender: AlbumGender.METAL,
      reviewScore: 4.4,
    },
  ];

  public getAlbums(albumSearchDto: AlbumSearchDto): Array<AlbumDto> {
    const { gender, search } = albumSearchDto;

    return this.albums
      .filter((album) => this.filterBySearch(album, search))
      .filter((album) => this.filterByGender(album, gender));
  }

  public getAlbum(id: string): AlbumDto {
    const foundAlbum = this.albums.find((album) => album.id === id);

    if (!foundAlbum) {
      throw new UnprocessableEntityException(
        `Album with id '${id}' was not found`,
      );
    }

    return foundAlbum;
  }

  public createAlbum(album: CreateAlbumDto): AlbumDto {
    const newAlbum: AlbumDto = { ...album, id: uuidv4() };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  public deleteAlbum(id: string) {
    const albumToBeDeleted = this.getAlbum(id);
    this.albums.splice(this.albums.indexOf(albumToBeDeleted), 1);
  }

  public updateAlbumReview(id: string, score: number): AlbumDto {
    return { ...this.getAlbum(id), reviewScore: score };
  }

  private filterByGender(album: AlbumDto, gender: AlbumGender): boolean {
    return gender ? album.gender === gender : true;
  }

  private filterBySearch(album: AlbumDto, search: string): boolean {
    if (!search) {
      return true;
    }

    return (
      album.title.toLowerCase().includes(search.toLowerCase()) ||
      album.author.toLowerCase().includes(search.toLowerCase())
    );
  }
}
