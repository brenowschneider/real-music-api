import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AlbumGender } from '../enums/album-gender.enum';
import { Review } from './review.entity';

@Entity()
export class Album extends BaseEntity {
  
  @PrimaryGeneratedColumn()  
  id: number;

  @Column()
  title: string;
  
  @Column()
  author: string;
  
  @Column()
  year: number;
  
  @Column()
  gender: AlbumGender;
  
  @Column({type: 'real'})
  score: number;

  @OneToMany(() => Review, review => review.album)
  reviews: Review[];

}
