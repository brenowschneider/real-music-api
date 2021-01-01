import { EntityRepository, Repository } from 'typeorm';
import { CreateReviewDto } from '../dto/create-review.dto';
import { Album } from '../entities/album.entity';
import { Review } from '../entities/review.entity';

@EntityRepository(Review)
export class ReviewsRepository extends Repository<Review> {
  public async getReviews(): Promise<Array<Review>> {
    return await this.find();
  }

  public async createReview(
    review: CreateReviewDto,
    reviewedAlbum: Album,
  ): Promise<Review> {
    const newReview = new Review();
    Object.assign(newReview, review, {date: new Date()}, { album: reviewedAlbum });
    return await newReview.save();
  }
}
