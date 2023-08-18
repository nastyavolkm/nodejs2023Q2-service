import Artist from '../../artist/artist.entity';
import Album from '../../album/album.entity';
import { Track } from '../../track/track.entity';

export class FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
