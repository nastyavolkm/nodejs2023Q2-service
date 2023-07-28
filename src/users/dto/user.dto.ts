import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

export class User {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  @ApiHideProperty()
  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
