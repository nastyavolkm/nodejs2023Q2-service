import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Artist } from '../artist/dto/artist.dto';
import { User } from '../users/dto/user.dto';
import { Album } from '../album/dto/album.dto';
import { Track } from '../track/dto/track.dto';
import { Favorites } from '../favs/dto/favorites.dto';
import { UpdatePasswordDto } from '../users/dto/update-password.dto';
import { UpdateTrackDto } from '../track/dto/update-track.dto';
import { UpdateAlbumDto } from '../album/dto/update-album.dto';
import { UpdateArtistDto } from '../artist/dto/update-artist.dto';

export const users: User[] = [];

export const tracks: Track[] = [];

export const artists: Artist[] = [];

export const albums: Album[] = [];

export const favs: Favorites = {
  artists: [],
  tracks: [],
  albums: [],
};

@Injectable()
export class DataService {
  public async getUsers(): Promise<User[]> {
    return users;
  }

  public async getUserById(id: string): Promise<User | undefined> {
    return users.find((user) => user.id === id);
  }

  public async createUser(user: User): Promise<User> {
    users.push(user);
    return user;
  }

  public async updateUserPassword(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): Promise<User> {
    const index = users.findIndex((user) => user.id === id);
    const user = users[index];
    if (user.password !== oldPassword) {
      throw new HttpException('Wrong old password', HttpStatus.FORBIDDEN);
    }
    users[index] = {
      ...user,
      password: newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };
    return users[index];
  }

  public async deleteUser(id: string): Promise<void> {
    const index = users.findIndex((item) => item.id === id);
    if (index < 0) throw new NotFoundException(`User with id ${id} not found`);
    users.splice(index, 1);
  }

  public async getArtists(): Promise<Artist[]> {
    return artists;
  }

  public async getArtistById(id: string): Promise<Artist | undefined> {
    return artists.find((artist) => artist.id == id);
  }

  public async createArtist(newArtist: Artist): Promise<Artist> {
    artists.push(newArtist);
    return newArtist;
  }

  public async updateArtist(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    const index = artists.findIndex((artist) => artist.id === id);
    const newArtist = {
      ...artists[index],
      ...updateArtistDto,
    };
    artists[index] = newArtist;
    return newArtist;
  }

  public async deleteArtist(id: string): Promise<void> {
    const index = artists.findIndex((item) => item.id === id);
    if (index < 0)
      throw new NotFoundException(`Artist with id ${id} not found`);
    artists.splice(index, 1);

    const indexInFavs = favs.artists.findIndex((itemId) => itemId === id);
    if (indexInFavs >= 0) {
      favs.artists.splice(indexInFavs, 1);
    }

    tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });

    albums.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });
  }

  public async addArtistToFavs(id: string): Promise<void> {
    favs.artists.push(id);
  }

  public async deleteArtistFromFavs(id: string): Promise<void> {
    const indexInFavs = favs.artists.findIndex((itemId) => itemId === id);
    if (indexInFavs < 0)
      throw new NotFoundException(
        `Artist with id ${id} not found in favorites artists`,
      );
    favs.artists.splice(indexInFavs, 1);
  }

  public async getAlbums(): Promise<Album[]> {
    return albums;
  }

  public async getAlbumById(id: string): Promise<Album | undefined> {
    return albums.find((track) => track.id == id);
  }

  public async createAlbum(newAlbum: Album): Promise<Album> {
    albums.push(newAlbum);
    return newAlbum;
  }

  public async updateAlbum(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    const index = albums.findIndex((album) => album.id === id);
    const newAlbum = {
      ...albums[index],
      ...updateAlbumDto,
    };
    albums[index] = newAlbum;
    return newAlbum;
  }

  public async deleteAlbum(id: string): Promise<void> {
    const index = albums.findIndex((item) => item.id === id);
    if (index < 0) throw new NotFoundException(`Album with id ${id} not found`);
    albums.splice(index, 1);

    const indexInFavs = favs.albums.findIndex((itemId) => itemId === id);
    if (indexInFavs >= 0) {
      favs.albums.splice(indexInFavs, 1);
    }

    tracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });
  }

  public async addAlbumToFavs(id: string): Promise<void> {
    favs.albums.push(id);
  }

  public async deleteAlbumFromFavs(id: string): Promise<void> {
    const indexInFavs = favs.albums.findIndex((itemId) => itemId === id);
    if (indexInFavs < 0)
      throw new NotFoundException(
        `Album with id ${id} not found in favorites albums`,
      );
    favs.albums.splice(indexInFavs, 1);
  }

  public async getTracks(): Promise<Track[]> {
    return tracks;
  }

  public async getTrackById(id: string): Promise<Track | undefined> {
    return tracks.find((track) => track.id == id);
  }

  public async createTrack(newTrack: Track): Promise<Track> {
    tracks.push(newTrack);
    return newTrack;
  }

  public async updateTrack(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    const index = tracks.findIndex((track) => track.id === id);
    const newTrack = {
      ...tracks[index],
      ...updateTrackDto,
    };
    tracks[index] = newTrack;
    return newTrack;
  }

  public async deleteTrack(id: string): Promise<void> {
    const index = tracks.findIndex((item) => item.id === id);
    if (index < 0) throw new NotFoundException(`Track with id ${id} not found`);
    tracks.splice(index, 1);

    const indexInFavs = favs.tracks.findIndex((itemId) => itemId === id);
    if (indexInFavs >= 0) {
      favs.tracks.splice(indexInFavs, 1);
    }
  }

  public async addTrackToFavs(id: string): Promise<void> {
    favs.tracks.push(id);
  }

  public async deleteTrackFromFavs(id: string): Promise<void> {
    const indexInFavs = favs.tracks.findIndex((itemId) => itemId === id);
    if (indexInFavs < 0)
      throw new NotFoundException(
        `Track with id ${id} not found in favorites tracks`,
      );
    favs.tracks.splice(indexInFavs, 1);
  }

  public async getFavs(): Promise<Favorites> {
    return favs;
  }
}
