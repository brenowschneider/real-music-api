import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumDto } from '../dto/album.dto';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { AlbumSearchDto } from '../dto/album-search.dto';
import { AlbumRepository } from '../repositories/album.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumDetailsDto } from '../dto/album-details.dto';

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

  public async getAlbum(id: number): Promise<AlbumDetailsDto> {
    return { ...(await this.getAlbumWithReviewsFromRepository(id)) };
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

  private async getAlbumWithReviewsFromRepository(id: number) {
    const albumFromRepository = await this.albumRepository.findOne({
      where: {id: id},
      relations: ['reviews']
    });

    if (!albumFromRepository) {
      throw new NotFoundException(`Album with id '${id}' was not found`);
    }

    return albumFromRepository;
  }

  private async getAlbumFromRepository(id: number) {
    const albumFromRepository = await this.albumRepository.findOne(id);

    if (!albumFromRepository) {
      throw new NotFoundException(`Album with id '${id}' was not found`);
    }

    return albumFromRepository;
  }
}
