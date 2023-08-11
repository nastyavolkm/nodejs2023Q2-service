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
import { UserDto } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { NotFoundError } from '../errors/not-found-error';
import { WrongPasswordError } from '../errors/wrong-password-error';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  @Get()
  async findAll(): Promise<UserDto[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<UserDto> {
    try {
      return this.usersService.getById(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message);
      } else {
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    try {
      return this.usersService.create(createUserDto);
    } catch {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  @Put(':id')
  async update(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserDto> {
    try {
      return this.usersService.updatePassword(id, updatePasswordDto);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message);
      } else if (error instanceof WrongPasswordError) {
        throw new HttpException(error.message, HttpStatus.FORBIDDEN);
      } else {
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.usersService.delete(id);
  }
}
