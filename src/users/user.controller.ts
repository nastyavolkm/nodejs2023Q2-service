import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
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
import { User } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';

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
    const user = await this.usersService.getById(id);
    if (user) return user;
    throw new NotFoundException(`User with id ${id} not found`);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.usersService.create(createUserDto);
    if (newUser) return newUser;
    throw new InternalServerErrorException('Something went wrong');
  }

  @Put(':id')
  async update(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<User> {
    const updatedUser = await this.usersService.updatePassword(
      id,
      updatePasswordDto,
    );
    if (updatedUser) return updatedUser;
    throw new NotFoundException(`User with id ${id} not found`);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.usersService.delete(id);
  }
}
