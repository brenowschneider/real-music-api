import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { AlbumSearchDto } from '../dto/album-search.dto';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { CreateReviewDto } from '../dto/create-review.dto';
import { Album } from '../entities/album.entity';
import { Review } from '../entities/review.entity';
import { AlbumGender } from '../enums/album-gender.enum';

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
    Object.assign(newReview, review, { album: reviewedAlbum });
    return await newReview.save();
  }
}
