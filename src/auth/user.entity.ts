import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm/index';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  enabled: boolean;
}