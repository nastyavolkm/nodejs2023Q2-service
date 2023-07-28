import { IsBoolean, IsDefined, IsOptional } from 'class-validator';

export class UpdateArtistDto {
  @IsDefined()
  name: string;

  @IsOptional()
  @IsBoolean()
  grammy: boolean;
}
