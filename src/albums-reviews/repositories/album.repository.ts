import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { AlbumSearchDto } from '../dto/album-search.dto';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { Album } from '../entities/album.entity';
import { AlbumGender } from '../enums/album-gender.enum';

@EntityRepository(Album)
export class AlbumRepository extends Repository<Album> {
  public async getAlbums(
    albumSearchDto: AlbumSearchDto,
  ): Promise<Array<Album>> {
    const { gender, search } = albumSearchDto;

    const query = this.createQueryBuilder('album');

    this.addSearchFilter(search, query);
    this.addGenderFilter(gender, query);

    return await query.getMany();
  }

  public async createAlbum(album: CreateAlbumDto): Promise<Album> {
    const newAlbum = new Album();
    Object.assign(newAlbum, album);
    return await newAlbum.save();
  }

  private addSearchFilter(search: string, query: SelectQueryBuilder<Album>) {
    if (search) {
      query.andWhere('LOWER(album.title) LIKE :search OR LOWER(album.author) LIKE :search', {
        search: `%${search.toLowerCase()}%`,
      });
    }
  }

  private addGenderFilter(
    gender: AlbumGender,
    query: SelectQueryBuilder<Album>,
  ) {
    if (gender) {
      query.andWhere('album.gender = :gender', { gender });
    }
  }
}
