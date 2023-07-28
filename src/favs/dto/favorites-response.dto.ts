import { Artist } from '../../artist/dto/artist.dto';
import { Album } from '../../album/dto/album.dto';
import { Track } from '../../track/dto/track.dto';

export class FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
