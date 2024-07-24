import { SeriesService } from './../../services/series.service';
import { TvShow } from './../../models/tvShow';
import { MoviesService } from './../../services/movies.service';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  nowPlayingMovies: Movie[] = [];
  popularMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  popularTvShows: TvShow[] = [];

  constructor(private moviesService: MoviesService, private seriesService: SeriesService) {}

  ngOnInit(): void {
    this.moviesService.getMovies('now_playing').subscribe((movies) => {
      this.nowPlayingMovies = movies;
    });
    this.moviesService.getMovies('popular').subscribe((movies) => {
      this.popularMovies = movies;
    });
    this.moviesService.getMovies('upcoming').subscribe((movies) => {
      this.upcomingMovies = movies;
    });
    this.seriesService.getSeries('popular').subscribe((tvShows) => {
      this.popularTvShows = tvShows;
    });
  }
}
