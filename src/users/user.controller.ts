import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.getAll();
  }
  @Get(':id')
  async findOne(@Param() params: any): Promise<User> {
    return this.usersService.getById(params.id);
  }
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return 'This action adds a new cat';
  }
}
