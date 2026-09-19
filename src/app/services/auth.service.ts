import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'Customer' | 'Contractor' | 'Admin';
  companyName?: string;
  gstin?: string;
  isB2bVerified?: boolean;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: UserProfile;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  currentUser = signal<UserProfile | null>(this.getStoredUser());
  token = signal<string | null>(localStorage.getItem('jlite_token'));

  isLoggedIn = computed(() => !!this.currentUser());
  isAdmin = computed(() => this.currentUser()?.role === 'Admin');
  isContractor = computed(() => this.currentUser()?.role === 'Contractor' || this.currentUser()?.role === 'Admin');

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, credentials).pipe(
      tap(res => {
        this.setSession(res);
      })
    );
  }

  register(userData: { fullName: string; email: string; phone: string; password: string; role?: string; companyName?: string; gstin?: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register`, userData).pipe(
      tap(res => {
        if (res.token) {
          this.setSession(res);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('jlite_token');
    localStorage.removeItem('jlite_user');
    this.currentUser.set(null);
    this.token.set(null);
  }

  private setSession(authResult: AuthResponse): void {
    localStorage.setItem('jlite_token', authResult.token);
    localStorage.setItem('jlite_user', JSON.stringify(authResult.user));
    this.currentUser.set(authResult.user);
    this.token.set(authResult.token);
  }

  private getStoredUser(): UserProfile | null {
    const saved = localStorage.getItem('jlite_user');
    if (!saved) return null;
    try {
      return JSON.parse(saved);
    } catch {
      return null;
    }
  }
}
