import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { users } from '../store';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  public async getAll(): Promise<User[]> {
    return users;
  }

  public async getById(id: string): Promise<User> {
    const user = users.find((user) => user.id === id);
    if (user) return user;
    throw new NotFoundException(`User with id ${id} not found`);
  }

  public async create(user: CreateUserDto): Promise<User> {
    const newUser = {
      ...user,
      id: uuidv4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    users.push(newUser);
    return newUser;
  }

  public async updatePassword(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): Promise<User> {
    const index = users.findIndex((item) => item.id === id);
    if (index < 0) throw new NotFoundException(`User with id ${id} not found`);

    const user = users[index];
    if (user.password !== oldPassword) {
      throw new HttpException('Wrong old password', HttpStatus.FORBIDDEN);
    }
    users[index] = {
      ...user,
      password: newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };
    return users[index];
  }

  public async delete(id: string): Promise<void> {
    const index = users.findIndex((item) => item.id === id);
    if (index < 0) throw new NotFoundException(`User with id ${id} not found`);
    users.splice(index, 1);
  }
}
