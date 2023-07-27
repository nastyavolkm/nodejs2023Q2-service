import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserResponse } from './interfaces/user-response.interface';
import { users } from '../store';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  public async getAll(): Promise<UserResponse[]> {
    return users.map((user) => {
      const { password: _, ...rest } = user;
      return rest;
    });
  }

  public async getById(id: string): Promise<UserResponse> {
    const user = users.find((user) => user.id === id);
    if (user) {
      const { password: _, ...rest } = user;
      return rest;
    }
    throw new NotFoundException(`User with id ${id} not found`);
  }

  public async create(user: CreateUserDto): Promise<UserResponse> {
    const newUser = {
      ...user,
      id: uuidv4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    users.push(newUser);
    const { password: _, ...rest } = newUser;
    return rest;
  }

  public async updatePassword(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): Promise<UserResponse> {
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
    const { password: _, ...rest } = users[index];
    return rest;
  }

  public async delete(id: string): Promise<void> {
    const index = users.findIndex((item) => item.id === id);
    if (index < 0) throw new NotFoundException(`User with id ${id} not found`);
    users.splice(index, 1);
  }
}
