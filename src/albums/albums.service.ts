import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumDto } from './dto/album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AlbumSearchDto } from './dto/album-search.dto';
import { AlbumRepository } from './album.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumRepository)
    private albumRepository: AlbumRepository,
  ) {}

  public async getAlbums(
    albumSearchDto: AlbumSearchDto,
  ): Promise<Array<AlbumDto>> {

    return await this.albumRepository.getAlbums(albumSearchDto);

    // return this.albums
    //   .filter((album) => this.filterBySearch(album, search))
    //   .filter((album) => this.filterByGender(album, gender));
  }

  public async getAlbum(id: number): Promise<AlbumDto> {
    return { ...(await this.getAlbumFromRepository(id)) };
  }

  public async createAlbum(album: CreateAlbumDto): Promise<AlbumDto> {
    return await this.albumRepository.createAlbum(album);
  }

  public async deleteAlbum(id: number): Promise<void> {
    const deleteResult = await this.albumRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException('');
    }
  }

  public async updateAlbumScore(id: number, score: number): Promise<AlbumDto> {
    const albumToBeUpdated = await this.getAlbumFromRepository(id);
    albumToBeUpdated.score = score;
    return { ...(await albumToBeUpdated.save()) };
  }

  private async getAlbumFromRepository(id: number) {
    const albumFromRepository = await this.albumRepository.findOne(id);

    if (!albumFromRepository) {
      throw new NotFoundException(`Album with id '${id}' was not found`);
    }

    return albumFromRepository;
  }

  // private albums: Array<AlbumDto> = [
  //   {
  //     id: '25baff02-7fcd-41c2-9a3a-f0f871f95645',
  //     author: 'Angra',
  //     title: 'Temple Of Shadows',
  //     year: 2004,
  //     gender: AlbumGender.METAL,
  //     score: 4.6,
  //   },
  //   {
  //     id: '9190326e-f371-4251-b24c-2a9333bfb982',
  //     author: 'Shaman',
  //     title: 'Ritual',
  //     year: 2001,
  //     gender: AlbumGender.METAL,
  //     score: 4.2,
  //   },
  //   {
  //     id: 'ec15b4fd-3db1-4c88-9dc1-f8c2686f4300',
  //     author: 'Led Zeppelin',
  //     title: 'IV',
  //     year: 1971,
  //     gender: AlbumGender.ROCK,
  //     score: 4.7,
  //   },
  //   {
  //     id: '85c4d7ac-d3a5-40bb-aa50-a80149faff6a',
  //     author: 'Bon Jovi',
  //     title: 'Slippery When Wet',
  //     year: 1986,
  //     gender: AlbumGender.ROCK,
  //     score: 4.5,
  //   },
  //   {
  //     id: '210e61a5-2c78-468f-9483-1ee655b04991',
  //     author: 'Iron Maiden',
  //     title: 'Fear Of The Dark',
  //     year: 1992,
  //     gender: AlbumGender.METAL,
  //     score: 4.4,
  //   },
  // ];

  // public getAlbums(albumSearchDto: AlbumSearchDto): Array<AlbumDto> {
  //   const { gender, search } = albumSearchDto;

  //   return this.albums
  //     .filter((album) => this.filterBySearch(album, search))
  //     .filter((album) => this.filterByGender(album, gender));
  // }

  // private filterByGender(album: AlbumDto, gender: AlbumGender): boolean {
  //   return gender ? album.gender === gender : true;
  // }

  // private filterBySearch(album: AlbumDto, search: string): boolean {
  //   if (!search) {
  //     return true;
  //   }

  //   return (
  //     album.title.toLowerCase().includes(search.toLowerCase()) ||
  //     album.author.toLowerCase().includes(search.toLowerCase())
  //   );
  // }
}
