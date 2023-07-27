import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DataModule } from '../data/data.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [DataModule],
})
export class UserModule {}
