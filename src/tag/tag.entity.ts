import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '../post/post.entity';

@Entity({ name: 'tags' })
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'color', nullable: true })
  color: string;

  @Column({ name: 'description', nullable: true })
  description: string;
}
