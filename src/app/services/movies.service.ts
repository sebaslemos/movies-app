import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import {
  Movie,
  MovieDTO,
  MovieVideo,
  MovieVideoDto,
  MovieImages,
  MovieCredits,
  GenresDto
} from './../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  baseUrl: string = 'https://api.themoviedb.org/3/';
  baseMovieUrl: string = this.baseUrl + 'movie/';
  apiKey: string = '9f1ad50f53cb9e222e619f49ef12fcc2';

  constructor(private http: HttpClient) {}

  getMovies(type: string = 'upcoming', count: number = 12): Observable<Movie[]> {
    return this.http.get<MovieDTO>(`${this.baseMovieUrl}${type}?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.results.slice(0, count));
      })
    );
  }

  getMoviesByGenre(genreId: string, page: number): Observable<Movie[]> {
    return this.http
      .get<MovieDTO>(
        `${this.baseUrl}discover/movie?with_genres=${genreId}&page=${page}&api_key=${this.apiKey}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  getMovie(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseMovieUrl}${id}?api_key=${this.apiKey}`);
  }

  getMovieVideos(id: string): Observable<MovieVideo[]> {
    return this.http
      .get<MovieVideoDto>(`${this.baseMovieUrl}${id}/videos?api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  getMoviesGenres() {
    return this.http.get<GenresDto>(`${this.baseUrl}genre/movie/list?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.genres);
      })
    );
  }

  getMovieImages(id: string) {
    return this.http.get<MovieImages>(`${this.baseMovieUrl}${id}/images?api_key=${this.apiKey}`);
  }

  getMovieCredits(id: string) {
    return this.http.get<MovieCredits>(`${this.baseMovieUrl}${id}/credits?api_key=${this.apiKey}`);
  }

  getSimilarMovies(id: string) {
    return this.http.get<MovieDTO>(`${this.baseMovieUrl}${id}/similar?api_key=${this.apiKey}`);
  }

  searchMovies(page: number, searchValue?: string): Observable<Movie[]> {
    const uri = searchValue ? 'search/movie' : 'movie/popular';
    return this.http
      .get<MovieDTO>(
        `${this.baseUrl}${uri}?page=${page}&query=${searchValue}&api_key=${this.apiKey}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  totalMovies(): Observable<number> {
    return this.http.get<MovieDTO>(`${this.baseMovieUrl}popular?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        let total = res.total_results > 10000 ? 10000 : res.total_results;
        return of(total);
      })
    );
  }

  totalMoviesByGenre(genreId: string): Observable<number> {
    return this.http
      .get<MovieDTO>(`${this.baseUrl}discover/movie?with_genres=${genreId}&api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          let total = res.total_results > 10000 ? 10000 : res.total_results;
          return of(total);
        })
      );
  }
}
