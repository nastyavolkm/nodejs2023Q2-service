import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.usersService.getById(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  async update(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<User> {
    return this.usersService.updatePassword(id, updatePasswordDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.usersService.delete(id);
  }
}
