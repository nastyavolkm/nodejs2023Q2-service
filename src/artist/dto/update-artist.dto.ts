import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateArtistDto {
  @IsOptional()
  name: string;

  @IsOptional()
  @IsBoolean()
  grammy: boolean;
}
