export interface Watchable {
  id: number;
  title?: string;
  name?: string;
  original_title: string;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  overview: string;
  popularity: number;
  vote_count: number;
}

export interface WatchableDto {
  total_pages: number;
  total_results: number;
  page: number;
  results: Watchable[];
}
