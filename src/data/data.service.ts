import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from '../artist/dto/artist.dto';
import { User } from '../users/dto/user.dto';
import { Album } from '../album/dto/album.dto';
import { Track } from '../track/dto/track.dto';
import { Favorites } from '../favs/dto/favorites.dto';
import { UpdatePasswordDto } from '../users/dto/update-password.dto';
import { UpdateTrackDto } from '../track/dto/update-track.dto';
import { UpdateAlbumDto } from '../album/dto/update-album.dto';
import { UpdateArtistDto } from '../artist/dto/update-artist.dto';

@Injectable()
export class DataService {
  private users: User[] = [];

  private tracks: Track[] = [];

  private artists: Artist[] = [];

  private albums: Album[] = [];

  private favs: Favorites = {
    artists: [],
    tracks: [],
    albums: [],
  };
  public async getUsers(): Promise<User[]> {
    return this.users;
  }

  public async getUserById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  public async createUser(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  public async updateUserPassword(
    id: string,
    { newPassword }: UpdatePasswordDto,
  ): Promise<User> {
    const index = this.users.findIndex((user) => user.id === id);
    const user = this.users[index];
    this.users[index] = {
      ...user,
      password: newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };
    return this.users[index];
  }

  public async deleteUser(id: string): Promise<void> {
    const index = this.users.findIndex((item) => item.id === id);
    if (index < 0) throw new NotFoundException(`User with id ${id} not found`);
    this.users.splice(index, 1);
  }

  public async getArtists(): Promise<Artist[]> {
    return this.artists;
  }

  public async getArtistById(id: string): Promise<Artist | undefined> {
    return this.artists.find((artist) => artist.id == id);
  }

  public async createArtist(newArtist: Artist): Promise<Artist> {
    this.artists.push(newArtist);
    return newArtist;
  }

  public async updateArtist(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    const index = this.artists.findIndex((artist) => artist.id === id);
    const newArtist = {
      ...this.artists[index],
      ...updateArtistDto,
    };
    this.artists[index] = newArtist;
    return newArtist;
  }

  public async deleteArtist(id: string): Promise<void> {
    const index = this.artists.findIndex((item) => item.id === id);
    if (index < 0)
      throw new NotFoundException(`Artist with id ${id} not found`);
    this.artists.splice(index, 1);

    const indexInFavs = this.favs.artists.findIndex((itemId) => itemId === id);
    if (indexInFavs >= 0) {
      this.favs.artists.splice(indexInFavs, 1);
    }

    this.tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });

    this.albums.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });
  }

  public async addArtistToFavs(id: string): Promise<boolean> {
    this.favs.artists.push(id);
    return true;
  }

  public async deleteArtistFromFavs(id: string): Promise<boolean> {
    const indexInFavs = this.favs.artists.findIndex((itemId) => itemId === id);
    if (indexInFavs < 0)
      throw new NotFoundException(
        `Artist with id ${id} not found in favorites artists`,
      );
    this.favs.artists.splice(indexInFavs, 1);
    return true;
  }

  public async getAlbums(): Promise<Album[]> {
    return this.albums;
  }

  public async getAlbumById(id: string): Promise<Album | undefined> {
    return this.albums.find((track) => track.id == id);
  }

  public async createAlbum(newAlbum: Album): Promise<Album> {
    this.albums.push(newAlbum);
    return newAlbum;
  }

  public async updateAlbum(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    const index = this.albums.findIndex((album) => album.id === id);
    const newAlbum = {
      ...this.albums[index],
      ...updateAlbumDto,
    };
    this.albums[index] = newAlbum;
    return newAlbum;
  }

  public async deleteAlbum(id: string): Promise<void> {
    const index = this.albums.findIndex((item) => item.id === id);
    if (index < 0) throw new NotFoundException(`Album with id ${id} not found`);
    this.albums.splice(index, 1);

    const indexInFavs = this.favs.albums.findIndex((itemId) => itemId === id);
    if (indexInFavs >= 0) {
      this.favs.albums.splice(indexInFavs, 1);
    }

    this.tracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });
  }

  public async addAlbumToFavs(id: string): Promise<boolean> {
    this.favs.albums.push(id);
    return true;
  }

  public async deleteAlbumFromFavs(id: string): Promise<boolean> {
    const indexInFavs = this.favs.albums.findIndex((itemId) => itemId === id);
    if (indexInFavs < 0)
      throw new NotFoundException(
        `Album with id ${id} not found in favorites albums`,
      );
    this.favs.albums.splice(indexInFavs, 1);
    return true;
  }

  public async getTracks(): Promise<Track[]> {
    return this.tracks;
  }

  public async getTrackById(id: string): Promise<Track | undefined> {
    return this.tracks.find((track) => track.id == id);
  }

  public async createTrack(newTrack: Track): Promise<Track> {
    this.tracks.push(newTrack);
    return newTrack;
  }

  public async updateTrack(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    const index = this.tracks.findIndex((track) => track.id === id);
    const newTrack = {
      ...this.tracks[index],
      ...updateTrackDto,
    };
    this.tracks[index] = newTrack;
    return newTrack;
  }

  public async deleteTrack(id: string): Promise<boolean> {
    const index = this.tracks.findIndex((item) => item.id === id);
    if (index < 0) throw new NotFoundException(`Track with id ${id} not found`);
    this.tracks.splice(index, 1);

    const indexInFavs = this.favs.tracks.findIndex((itemId) => itemId === id);
    if (indexInFavs >= 0) {
      this.favs.tracks.splice(indexInFavs, 1);
      return true;
    }
  }

  public async addTrackToFavs(id: string): Promise<boolean> {
    this.favs.tracks.push(id);
    return true;
  }

  public async deleteTrackFromFavs(id: string): Promise<boolean> {
    const indexInFavs = this.favs.tracks.findIndex((itemId) => itemId === id);
    if (indexInFavs < 0)
      throw new NotFoundException(
        `Track with id ${id} not found in favorites tracks`,
      );
    this.favs.tracks.splice(indexInFavs, 1);
    return true;
  }

  public async getFavs(): Promise<Favorites> {
    return this.favs;
  }
}
