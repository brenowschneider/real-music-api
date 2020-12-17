import { Controller, Get } from '@nestjs/common';
import { ReviewsService } from '../services/reviews.service';
import { ReviewDto } from '../dto/review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Get()
  public async getReviews(): Promise<Array<ReviewDto>> {
    return await this.reviewsService.getReviews();
  }
}
