import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReviewDto } from '../dto/create-review.dto';
import { ReviewDto } from '../dto/review.dto';
import { Review } from '../entities/review.entity';
import { AlbumRepository } from '../repositories/album.repository';
import { ReviewsRepository } from '../repositories/reviews.repository';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewsRepository)
    private reviewsRepository: ReviewsRepository,
    @InjectRepository(AlbumRepository)
    private albumsRepository: AlbumRepository
  ) {}

  public async getReviews(): Promise<Array<Review>> {
    return (await this.reviewsRepository.getReviews()) as Array<Review>;
  }

  public async postReview(
    createReviewDto: CreateReviewDto,
  ): Promise<ReviewDto> {
    const reviewedAlbum = await this.albumsRepository.findOne(createReviewDto.albumId);

    if (!reviewedAlbum) {
      throw new NotFoundException(`Album with id '${createReviewDto.albumId}' was not found`);
    }

    return await this.reviewsRepository.createReview(
      createReviewDto,
      reviewedAlbum,
    );
  }
}
