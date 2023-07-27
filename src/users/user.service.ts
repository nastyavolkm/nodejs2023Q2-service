import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserResponse } from './interfaces/user-response.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { DataService } from '../data/data.service';

@Injectable()
export class UserService {
  constructor(private dataService: DataService) {}
  public async getAll(): Promise<UserResponse[]> {
    const users = await this.dataService.getUsers();
    return users.map((user) => {
      const { password: _, ...rest } = user;
      return rest;
    });
  }

  public async getById(id: string): Promise<UserResponse> {
    const user = await this.dataService.getUserById(id);
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
    try {
      const resultUser = await this.dataService.createUser(newUser);
      const { password: _, ...rest } = resultUser;
      return rest;
    } catch {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  public async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserResponse> {
    const user = await this.dataService.getUserById(id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    const updatedUser = await this.dataService.updateUserPassword(
      id,
      updatePasswordDto,
    );
    const { password: _, ...rest } = updatedUser;
    return rest;
  }

  public async delete(id: string): Promise<void> {
    await this.dataService.deleteUser(id);
  }
}
