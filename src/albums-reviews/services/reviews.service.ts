import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from '../entities/review.entity';
import { ReviewsRepository } from '../repositories/reviews.repository';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewsRepository)
    private reviewsRepository: ReviewsRepository,
  ) {}

  public async getReviews(): Promise<Array<Review>> {

    return await this.reviewsRepository.getReviews() as Array<Review>;

    // return this.albums
    //   .filter((album) => this.filterBySearch(album, search))
    //   .filter((album) => this.filterByGender(album, gender));
  }
}
