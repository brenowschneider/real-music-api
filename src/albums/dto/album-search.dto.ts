import { IsIn, IsOptional, IsString, MinLength } from "class-validator";
import { AlbumGender } from "../enums/album-gender.enum"

export class AlbumSearchDto {
    
    @IsOptional()
    @IsString()
    @MinLength(2)
    search: string;

    @IsOptional()
    @IsString()
    @IsIn([...Object.values(AlbumGender)])
    gender: AlbumGender
}