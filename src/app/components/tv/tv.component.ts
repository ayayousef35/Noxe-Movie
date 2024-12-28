import { Component,OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { faSearch} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css']
})
export class TvComponent {
  tvShows: any[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.fetchTvShows();
  }

  fetchTvShows(): void {
    this.movieService.getTrendingTvShows().subscribe((data: any) => {
      this.tvShows = data.results;
    });
  }
}
