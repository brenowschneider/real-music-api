import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumRepository } from './repositories/album.repository';
import { AlbumsController } from './controllers/albums.controller';
import { AlbumsService } from './services/albums.service';
import { ReviewsController } from './controllers/reviews.controller';
import { ReviewsService } from './services/reviews.service';
import { ReviewsRepository } from './repositories/reviews.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumRepository, ReviewsRepository])],
  controllers: [AlbumsController, ReviewsController],
  providers: [AlbumsService, ReviewsService],
})
export class AlbumsReviewsModule {}
