import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

export class UserDto {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  @ApiHideProperty()
  @Exclude()
  password: string;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}
