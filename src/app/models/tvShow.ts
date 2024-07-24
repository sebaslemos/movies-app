import { Watchable, WatchableDto } from './watchable';
export interface TvShow extends Watchable {
  first_air_date: string;
  origin_country: string[];
  readonly name: string;
  readonly original_name: string;
}

export interface TvShowDto extends WatchableDto {
  results: TvShow[];
}
