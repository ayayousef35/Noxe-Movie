import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError,BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jsonFileUrl = 'http://localhost:3000/users'; // Path to your JSON file
  private loggedInUserSubject = new BehaviorSubject<any>(null); // Tracks the logged-in user


  constructor(private http: HttpClient) {
    const user = localStorage.getItem('loggedInUser');
    this.loggedInUserSubject.next(user ? JSON.parse(user) : null);
  }

  // Fetch users from the JSON file
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonFileUrl).pipe(
      catchError((error) => {
        console.error('Error fetching users:', error);
        return throwError(error);
      })
    );
  }

  // Register a new user
  registerUser (user: { email: string; password: string; fristname: string ;lastname: string}): Observable<any> {
    return this.http.post(this.jsonFileUrl,user); // Save user to the JSON file
  }
  

  // Log in
  loginUser(email: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.jsonFileUrl).pipe(
      map((users) => {
        const user = users.find((u) => u.email === email && u.password === password);
        if (user) {
          localStorage.setItem('loggedInUser', JSON.stringify(user));
          this.loggedInUserSubject.next(user); // Update logged-in user
          return true;
        }
        return false;
      })
    );
  }

  getLoggedInUser(): any {
    return this.loggedInUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('loggedInUser'); // Check if the user is stored in localStorage
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');
    this.loggedInUserSubject.next(null); // Clear the logged-in user
  }

  getLoggedInUserObservable() {
    return this.loggedInUserSubject.asObservable(); // Observable for components to subscribe to
  }
}
