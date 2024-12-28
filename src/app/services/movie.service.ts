import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = 'f1aca93e54807386df3f6972a5c33b50';

  constructor(private http: HttpClient) {}
  // Fetch trending movies
  getTrendingMovies(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/trending/movie/week?api_key=${this.apiKey}`);
  }

  // Fetch trending TV shows
  getTrendingTvShows(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/trending/tv/week?api_key=${this.apiKey}`);
  }
   // Search for movies
   searchMovies(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search/movie?api_key=${this.apiKey}&query=${query}`);
  }
}
