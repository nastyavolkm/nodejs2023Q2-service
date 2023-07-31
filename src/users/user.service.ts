import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { DataService } from '../data/data.service';
import { User } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private dataService: DataService) {}
  public async getAll(): Promise<User[]> {
    const users = await this.dataService.getUsers();
    return users.map((user) => {
      return new User(user);
    });
  }

  public async getById(id: string): Promise<User | undefined> {
    const user = await this.dataService.getUserById(id);
    if (user) {
      return new User(user);
    } else {
      return undefined;
    }
  }

  public async create(user: CreateUserDto): Promise<User | undefined> {
    const newUser = {
      ...user,
      id: uuidv4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    try {
      const resultUser = await this.dataService.createUser(newUser);
      return new User(resultUser);
    } catch {
      return undefined;
    }
  }

  public async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User | undefined> {
    const user = await this.dataService.getUserById(id);
    if (!user) return undefined;

    if (user.password === updatePasswordDto.oldPassword) {
      const updatedUser = await this.dataService.updateUserPassword(
        id,
        updatePasswordDto,
      );
      return new User(updatedUser);
    }
    throw new HttpException('Wrong old password', HttpStatus.FORBIDDEN);
  }

  public async delete(id: string): Promise<void> {
    await this.dataService.deleteUser(id);
  }
}
