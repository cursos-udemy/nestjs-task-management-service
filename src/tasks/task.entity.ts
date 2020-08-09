import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm/index';
import { TaskStatus } from './task.model';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
