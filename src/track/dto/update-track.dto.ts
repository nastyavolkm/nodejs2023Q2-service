import { IsInt } from 'class-validator';

export class UpdateTrackDto {
  name?: string;

  @IsInt()
  duration?: number;

  artistId?: string | null;
  albumId?: string | null;
}
