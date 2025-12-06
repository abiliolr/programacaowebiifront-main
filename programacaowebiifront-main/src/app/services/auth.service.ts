import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth';
  private USER_KEY = 'auth-user';

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/login`,
      {
        username: credentials.username,
        password: credentials.password
      },
      httpOptions
    ).pipe(
      tap((data: any) => {
        // Assume data contains user info or we infer it.
        // For simulation purposes, if the backend doesn't return role, we'll need to set it in the component.
        // But if it does, we save it here.
        if (data) {
          this.saveUser(data);
        }
      })
    );
  }

  register(user: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/register`,
      user,
      httpOptions
    );
  }

  saveUser(user: any): void {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
  }

  getUser(): any {
    if (typeof window !== 'undefined') {
      const user = window.sessionStorage.getItem(this.USER_KEY);
      if (user) {
        return JSON.parse(user);
      }
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  getRole(): string {
    const user = this.getUser();
    // Simulate role if not present or explicit
    if (user && user.role) return user.role;
    // Fallback/Simulation logic can be here or in component.
    // Let's assume the user object might have 'perfil' or 'role'.
    return '';
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      window.sessionStorage.clear();
    }
    this.router.navigate(['/login']);
  }
}
