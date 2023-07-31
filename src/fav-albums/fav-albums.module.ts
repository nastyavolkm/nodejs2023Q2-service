import { Module } from '@nestjs/common';
import { FavAlbumsController } from './fav-albums.controller';
import { FavAlbumsService } from './fav-albums.service';
import { DataModule } from '../data/data.module';

@Module({
  controllers: [FavAlbumsController],
  providers: [FavAlbumsService],
  imports: [DataModule],
})
export class FavAlbumsModule {}
