import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePasswordDto } from './dto/update-password.dto';
import User from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from '../errors/not-found-error';
import { InternalError } from '../errors/internal-error';
import { WrongPasswordError } from '../errors/wrong-password-error';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  public async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async getById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (user) {
      return user;
    }
    throw new NotFoundError('User', id);
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
      const resultUser = await this.userRepository.create(newUser);
      await this.userRepository.save(resultUser);
      return new User(resultUser);
    } catch (error) {
      console.log(error);
      throw new InternalError();
    }
  }

  public async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) throw new NotFoundError('User', id);

    if (user.password === updatePasswordDto.oldPassword) {
      await this.userRepository.update(
        {
          id,
        },
        {
          password: updatePasswordDto.newPassword,
        },
      );
      const updatedUser = await this.userRepository.findOne({ where: { id } });
      return new User(updatedUser);
    }
    throw new WrongPasswordError();
  }

  public async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
