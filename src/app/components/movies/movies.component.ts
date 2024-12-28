import { Component,OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { faSearch} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: any[] = [];
  // filteredMovies: any[] = [];
  searchQuery: string = '';
  faSearch =faSearch;
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getTrendingMovies().subscribe(
      (response) => {
        this.movies = response.results;
        console.log(this.movies) // API returns a "results" array
      },
      (error) => {
        console.error('Error fetching trending movies:', error);
      }
    );
    this.fetchMovies();

  }
  fetchMovies(): void {
    if (this.searchQuery.trim() === '') {
      this.movieService.getTrendingMovies().subscribe((data: any) => {
        this.movies = data.results;
      });
    } else {
      this.movieService.searchMovies(this.searchQuery).subscribe((data: any) => {
        this.movies = data.results;
      });
    }
  }
  onSearch(): void {
    this.fetchMovies();
  }
}
