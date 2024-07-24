import { Watchable, WatchableDto } from './watchable';

export interface Movie extends Watchable {
  adult: boolean;
  release_date: string;
  video: boolean;
  revenue: number;
  runtime: number;
  status: string;
  genres: Genre[];
}

export interface MovieDTO extends WatchableDto {
  results: Movie[];
}

export interface Genre {
  id: string;
  name: string;
}

export interface GenresDto {
  genres: Genre[];
}

export interface MovieVideoDto {
  id: number;
  results: MovieVideo[];
}

export interface MovieVideo {
  site: string;
  key: string;
}

export interface MovieImages {
  backdrops: {
    file_path: string;
  }[];
}

export interface MovieCredits {
  cast: {
    name: string;
    profile_path: string;
  }[];
}
