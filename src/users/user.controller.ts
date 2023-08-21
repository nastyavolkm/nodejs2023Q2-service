import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ApiTags } from '@nestjs/swagger';
import { NotFoundError } from '../logger/not-found-error';
import { WrongPasswordError } from '../logger/wrong-password-error';
import User from './user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    try {
      return await this.usersService.getById(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.usersService.create(createUserDto);
    } catch {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  @Put(':id')
  async update(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<User> {
    try {
      return await this.usersService.updatePassword(id, updatePasswordDto);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof WrongPasswordError) {
        throw new HttpException(error.message, HttpStatus.FORBIDDEN);
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    try {
      await this.usersService.delete(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
