import { IsBoolean, IsDefined } from 'class-validator';

export class CreateArtistDto {
  @IsDefined()
  name: string;

  @IsDefined()
  @IsBoolean()
  grammy: boolean;
}
