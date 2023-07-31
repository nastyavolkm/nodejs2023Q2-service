import { IsDefined, IsInt, IsOptional, IsUUID } from 'class-validator';

export class CreateAlbumDto {
  @IsDefined()
  name: string;

  @IsDefined()
  @IsInt()
  year: number;

  @IsOptional()
  @IsUUID()
  artist?: string | null;
}
