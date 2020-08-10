import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm/index';

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

  @Column({ default: true })
  enabled: boolean;
}