import { User } from './users/interfaces/user.interface';
import { Track } from './track/interfaces/track.interface';
import { Artist } from './artist/interfaces/artist.interface';
import { Album } from './album/interfaces/album.interface';
import { Favorites } from './favs/interfaces/favorites.interface';

export const users: User[] = [];

export const tracks: Track[] = [];

export const artists: Artist[] = [];

export const albums: Album[] = [];

export const favs: Favorites = {
  artists: [],
  tracks: [],
  albums: [],
};
