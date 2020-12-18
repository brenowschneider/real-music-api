import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from './album.entity';

@Entity()
export class Review extends BaseEntity {
  
  @PrimaryGeneratedColumn()  
  id: number;
  
  @Column()
  title: string
  
  @Column()
  description: string

  @Column({type: 'decimal'})
  score: number;

  @ManyToOne(() => Album, album => album.reviews)
  album: Album;
}
