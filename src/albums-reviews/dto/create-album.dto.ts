import {
  IsIn,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { AlbumGender } from '../enums/album-gender.enum';

export class CreateAlbumDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  title: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  author: string;

  @IsNumber()
  @Min(1800)
  year: number;

  @IsString()
  @IsIn([...Object.values(AlbumGender)])
  gender: AlbumGender;
}
