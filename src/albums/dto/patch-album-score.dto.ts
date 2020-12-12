import { IsNumber, Max, Min } from 'class-validator';

export class PatchAlbumScoreDto {
  @IsNumber()
  @Min(0)
  @Max(5)
  score: number;
}
