import { AlbumDto } from './album.dto';

export class ReviewDto {
  id: number
  title: string;
  description: string;
  score: number;
  album: AlbumDto
}
