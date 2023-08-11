import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  public login: string;

  @Column()
  @ApiHideProperty()
  @Exclude()
  public password: string;

  @Column()
  public version: number;

  @Column()
  createdAt: number;

  @Column()
  updatedAt: number;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

export default User;
