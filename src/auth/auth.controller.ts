import {
  Body,
  Controller,
  HttpCode,
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
import { Public } from './public-decorator';
import { RefreshTokenDto } from './refresh-token.dto';
import { NoRefreshTokenError } from '../logger/no-refresh-token-error';
import User from '../users/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(200)
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

  @Public()
  @Post('signup')
  async signup(@Body() signUpDto: CreateUserDto): Promise<User> {
    try {
      return await this.authService.signup(signUpDto);
    } catch {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  @Post('refresh')
  @HttpCode(200)
  @Public()
  async refresh(@Body() { refreshToken }: RefreshTokenDto) {
    try {
      return await this.authService.refresh(refreshToken);
    } catch (error) {
      if (error instanceof NoRefreshTokenError) {
        throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
