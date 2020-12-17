import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsReviewsModule } from './albums-reviews/albums-review.module';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [AlbumsReviewsModule, TypeOrmModule.forRoot(typeOrmConfig)],
})
export class AppModule {}
