import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { users } from '../store';

@Injectable()
export class UsersService {
  public getAll(): User[] {
    return users;
  }
}
