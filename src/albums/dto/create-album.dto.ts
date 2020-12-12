import { AlbumGender } from "../enums/album-gender.enum";

export class CreateAlbumDto {
    title: string;
    author: string;
    year: number;
    gender: AlbumGender;
    reviewScore: number;
  }