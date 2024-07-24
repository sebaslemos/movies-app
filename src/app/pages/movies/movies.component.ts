import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from './../../models/movie';
import { MoviesService } from './../../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  readonly itemPerPage: number = 20;
  totalMovies: number = 0;
  movies: Movie[] = [];
  genreId: string | null = null;
  searchValue: string | null = null;

  constructor(private moviesService: MoviesService, private route: ActivatedRoute) {}

  paginate(event: any) {
    const pageNumber = event.page + 1;
    if (this.genreId) {
      this.getPagedMoviesByGenre(this.genreId, pageNumber);
    } else {
      if (this.searchValue) {
        this.getPagedMovies(pageNumber, this.searchValue);
      } else {
        this.getPagedMovies(pageNumber);
      }
    }
  }

  searchChanged() {
    if (this.searchValue) this.getPagedMovies(1, this.searchValue);
  }

  getPagedMoviesByGenre(genreId: string, page: number) {
    this.moviesService.getMoviesByGenre(genreId, page).subscribe((movies) => {
      this.movies = movies;
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(({ genreId }) => {
      if (genreId) {
        this.genreId = genreId;
        this.getMoviesByGenre(genreId, 1);
        this.moviesService
          .totalMoviesByGenre(genreId)
          .subscribe((total) => (this.totalMovies = total));
      } else {
        this.getPagedMovies(1);
        this.moviesService.totalMovies().subscribe((total) => (this.totalMovies = total));
      }
    });
  }

  getMoviesByGenre(genreId: string, page: number) {
    this.moviesService.getMoviesByGenre(genreId, page).subscribe((movies) => {
      this.movies = movies;
    });
  }

  getPagedMovies(page: number, searchKey?: string) {
    this.moviesService.searchMovies(page, searchKey).subscribe((movies) => {
      this.movies = movies;
    });
  }
}
