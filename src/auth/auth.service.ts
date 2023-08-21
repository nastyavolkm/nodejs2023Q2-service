import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { WrongPasswordError } from '../logger/wrong-password-error';
import { NotFoundError } from '../logger/not-found-error';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { NoRefreshTokenError } from '../logger/no-refresh-token-error';
import User from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(login: string, pass: string) {
    const user = await this.userService.getByUserName(login);
    if (!user) {
      throw new NotFoundError('User', login);
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new WrongPasswordError();
    }
    return await this.generateTokens(user.login, user.id);
  }

  async signup(newUser: CreateUserDto): Promise<User> {
    const password = await bcrypt.hash(
      newUser.password,
      Number(process.env.CRYPT_SALT),
    );
    return await this.userService.create({
      ...newUser,
      password,
    });
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new NoRefreshTokenError();
    }
    const payload = await this.jwtService.verifyAsync<any>(refreshToken, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
    });
    const login = payload.login;
    const userId = payload.userId;
    return await this.generateTokens(login, userId);
  }

  private async generateTokens(login: string, id: string) {
    const payload = { userId: id, login };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      }),
    };
  }
}
