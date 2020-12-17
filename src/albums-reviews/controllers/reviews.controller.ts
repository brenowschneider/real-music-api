import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReviewsService } from '../services/reviews.service';
import { ReviewDto } from '../dto/review.dto';
import { CreateReviewDto } from '../dto/create-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Get()
  public async getReviews(): Promise<Array<ReviewDto>> {
    return await this.reviewsService.getReviews();
  }

  @Post()
  public async postReview(@Body() createReviewDto: CreateReviewDto): Promise<ReviewDto> {
    return await this.reviewsService.postReview(createReviewDto);
  }
}
