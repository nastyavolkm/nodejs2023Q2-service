import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateTrackDto {
  @IsDefined()
  @IsNotEmpty()
  name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  duration: number;

  @IsOptional()
  @IsUUID()
  artistId?: string | null;

  @IsOptional()
  @IsUUID()
  albumId?: string | null;
}
