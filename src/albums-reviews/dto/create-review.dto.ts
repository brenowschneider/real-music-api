import {
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  title: string;

  @IsString()
  @MinLength(3)
  description: string;

  @IsNumber()
  albumId: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  score: number;
}
