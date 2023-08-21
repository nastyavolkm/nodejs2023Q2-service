import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import User from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from '../logger/not-found-error';
import { WrongPasswordError } from '../logger/wrong-password-error';
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
      version: 1,
    };
    const resultUser = this.userRepository.create(newUser);
    await this.userRepository.save(resultUser);
    return new User(resultUser);
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
      await this.userRepository.save({
        ...user,
        password: updatePasswordDto.newPassword,
        version: user.version + 1,
      });
      const updatedUser = await this.userRepository.findOne({ where: { id } });
      return new User(updatedUser);
    }
    throw new WrongPasswordError();
  }

  public async delete(id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundError('User', id);
    await this.userRepository.delete(id);
  }
}
