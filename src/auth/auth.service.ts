import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { WrongPasswordError } from '../logger/wrong-password-error';
import { NotFoundError } from '../logger/not-found-error';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserNameExistsError } from '../logger/user-name-exists-error';
import * as bcrypt from 'bcrypt';

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
    const payload = { sub: user.id, username: user.login };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signup(newUser: CreateUserDto) {
    const user = await this.userService.getByUserName(newUser.login);
    if (user) {
      throw new UserNameExistsError(newUser.login);
    }
    const password = await bcrypt.hash(
      newUser.password,
      process.env.CRYPT_SALT,
    );
    const newItem = await this.userService.create({
      ...newUser,
      password,
    });
    const payload = { sub: newItem.id, username: newItem.login };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
