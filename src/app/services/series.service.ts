import { TvShow, TvShowDto } from './../models/tvShow';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  baseUrl: string = 'https://api.themoviedb.org/3/tv/';
  apiKey: string = '9f1ad50f53cb9e222e619f49ef12fcc2';

  constructor(private http: HttpClient) {}

  getSeries(type: string = 'on_the_air', count: number = 12): Observable<TvShow[]> {
    return this.http.get<TvShowDto>(`${this.baseUrl}${type}?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.results.slice(0, count));
      })
    );
  }
}
