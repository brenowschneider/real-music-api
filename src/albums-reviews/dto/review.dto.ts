import { Album } from "../entities/album.entity";

export class ReviewDto {
  id: number
  title: string;
  description: string;
  score: number;
  album: Album
}
