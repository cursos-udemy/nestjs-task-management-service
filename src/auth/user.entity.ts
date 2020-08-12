import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm/index';
import { Task } from '../tasks/task.entity';

@Entity()
//@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(type => Task, task => task.user, { eager: true })
  tasks: Task[];

  @Column({ default: true })
  enabled: boolean;
}