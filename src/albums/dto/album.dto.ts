import { AlbumGender } from '../enums/album-gender.enum';

export class AlbumDto {
  id: string
  title: string;
  author: string;
  year: number;
  gender: AlbumGender;
  score: number;
}
