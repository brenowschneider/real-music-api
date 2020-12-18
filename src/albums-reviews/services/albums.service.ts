import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumDto } from '../dto/album.dto';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { AlbumSearchDto } from '../dto/album-search.dto';
import { AlbumRepository } from '../repositories/album.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumDetailsDto } from '../dto/album-details.dto';
import { Review } from '../entities/review.entity';
import { Album } from '../entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumRepository)
    private albumRepository: AlbumRepository,
  ) {}

  public async getAlbums(
    albumSearchDto: AlbumSearchDto,
  ): Promise<Array<AlbumDto>> {
    return (await this.albumRepository.getAlbums(albumSearchDto)).map((album) =>
      this.mapFromAlbumToAlbumDto(album),
    );
  }

  public async getAlbum(id: number): Promise<AlbumDetailsDto> {
    return this.mapFromAlbumToAlbumDetailsDto(await this.getAlbumWithReviewsFromRepository(id));
  }

  public async createAlbum(album: CreateAlbumDto): Promise<AlbumDto> {
    return this.mapFromAlbumToAlbumDto(await this.albumRepository.createAlbum(album));
  }

  public async deleteAlbum(id: number): Promise<void> {
    const deleteResult = await this.albumRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException('');
    }
  }

  private async getAlbumWithReviewsFromRepository(id: number) {
    const albumFromRepository = await this.albumRepository.findOne({
      where: { id: id },
      relations: ['reviews'],
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

  private mapFromAlbumToAlbumDto(album: Album): AlbumDto {
    let numberOfReviews = 0;
    let score = 0;

    if (album.reviews?.length > 0) {
      numberOfReviews = album.reviews.length;
      score =
        +(album.reviews.reduce(
          (accumulator: number, review: Review) => accumulator + +review.score,
          0,
        ) / numberOfReviews).toFixed(2);
    }

    return { ...album, score: score, numberOfReviews: numberOfReviews };
  }

  private mapFromAlbumToAlbumDetailsDto(album: Album): AlbumDetailsDto {
    return { ...this.mapFromAlbumToAlbumDto(album), reviews: album.reviews };
  }
}
