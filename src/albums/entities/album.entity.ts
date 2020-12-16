import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AlbumGender } from '../enums/album-gender.enum';

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
}
