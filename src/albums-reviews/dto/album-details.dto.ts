import { AlbumDto } from "./album.dto";
import { ReviewDto } from "./review.dto";

export class AlbumDetailsDto extends AlbumDto {
    reviews: Array<ReviewDto>
}