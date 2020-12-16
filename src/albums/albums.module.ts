import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumRepository } from './album.repository';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumRepository])],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
