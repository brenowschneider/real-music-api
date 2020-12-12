import { AlbumGender } from "../enums/album-gender.enum"

export class AlbumSearchDto {
    search: string;
    gender: AlbumGender
}