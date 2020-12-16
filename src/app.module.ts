import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from './albums/albums.module';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [AlbumsModule, TypeOrmModule.forRoot(typeOrmConfig)],
})
export class AppModule {}
