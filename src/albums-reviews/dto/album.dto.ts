import { AlbumGender } from '../enums/album-gender.enum';

export class AlbumDto {
  id: number;
  title: string;
  author: string;
  year: number;
  gender: AlbumGender;
  score: number;
  numberOfReviews: number;
}
