import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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

  public async getById(id: string): Promise<User> {
    const user = await this.dataService.getUserById(id);
    if (user) {
      return new User(user);
    }
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
    try {
      const resultUser = await this.dataService.createUser(newUser);
      return new User(resultUser);
    } catch {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  public async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.dataService.getUserById(id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    const updatedUser = await this.dataService.updateUserPassword(
      id,
      updatePasswordDto,
    );
    return new User(updatedUser);
  }

  public async delete(id: string): Promise<void> {
    await this.dataService.deleteUser(id);
  }
}
