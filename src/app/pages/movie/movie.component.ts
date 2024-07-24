import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMAGES_SIZES } from './../../constants/images-size';
import { Movie, MovieCredits, MovieImages, MovieVideo } from './../../models/movie';
import { MoviesService } from './../../services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {
  movie: Movie | null = null;
  imagesSizes = IMAGES_SIZES;
  movieVideos: MovieVideo[] = [];
  movieImages: MovieImages | null = null;
  movieCredits: MovieCredits | null = null;
  similarMovies: Movie[] = [];

  constructor(private route: ActivatedRoute, private moviesSerice: MoviesService) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.getMovie(id);
      this.getMovieVideos(id);
      this.getMovieImages(id);
      this.getMovieCredits(id);
      this.getSimilarMovies(id);
    });
  }

  getSimilarMovies(id: string) {
    this.moviesSerice.getSimilarMovies(id).subscribe((movieDto) => {
      this.similarMovies = movieDto.results;
    });
  }

  ngOnDestroy(): void {}

  getMovieVideos(id: string) {
    this.moviesSerice.getMovieVideos(id).subscribe((movieVideoData) => {
      this.movieVideos = movieVideoData;
    });
  }

  getMovieCredits(id: string) {
    this.moviesSerice.getMovieCredits(id).subscribe((movieCredts) => {
      this.movieCredits = movieCredts;
    });
  }

  getMovie(id: string) {
    this.moviesSerice.getMovie(id).subscribe((movie) => {
      this.movie = movie;
    });
  }

  getMovieImages(id: string) {
    this.moviesSerice.getMovieImages(id).subscribe((movieImagesData) => {
      this.movieImages = movieImagesData;
    });
  }
}
