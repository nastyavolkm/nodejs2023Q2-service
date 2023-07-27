import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
import { DataModule } from '../data/data.module';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [DataModule],
})
export class FavsModule {}
