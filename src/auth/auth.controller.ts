import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { NotFoundError } from '../logger/not-found-error';
import { WrongPasswordError } from '../logger/wrong-password-error';
import { UserNameExistsError } from '../logger/user-name-exists-error';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() signInDto: CreateUserDto) {
    try {
      const { login, password } = signInDto;
      return await this.authService.login(login, password);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message);
      }

      if (error instanceof WrongPasswordError) {
        throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
      }

      throw new InternalServerErrorException('Something went wrong');
    }
  }

  @Post('signup')
  async signup(@Body() signUpDto: CreateUserDto) {
    try {
      return await this.authService.signup(signUpDto);
    } catch (error) {
      if (error instanceof UserNameExistsError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
