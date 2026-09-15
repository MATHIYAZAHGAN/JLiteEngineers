import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses?: Address[];
  createdAt?: string;
}

export interface Address {
  id?: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  // Signals for reactive UI
  isAuthenticated = signal<boolean>(false);
  currentUser = signal<User | null>(null);

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  /**
   * Load user from localStorage on app init
   */
  private loadUserFromStorage(): void {
    const token = localStorage.getItem('auth_token');
    const userJson = localStorage.getItem('current_user');
    
    if (token && userJson) {
      try {
        const user = JSON.parse(userJson);
        this.currentUserSubject.next(user);
        this.currentUser.set(user);
        this.isAuthenticated.set(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        this.logout();
      }
    }
  }

  /**
   * Register a new user
   */
  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, request).pipe(
      tap(response => {
        if (response.success && response.user && response.token) {
          this.handleAuthSuccess(response.user, response.token);
        }
      })
    );
  }

  /**
   * Login user
   */
  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, request).pipe(
      tap(response => {
        if (response.success && response.user && response.token) {
          this.handleAuthSuccess(response.user, response.token);
        }
      })
    );
  }

  /**
   * Logout user
   */
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
    this.currentUserSubject.next(null);
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
  }

  /**
   * Get authentication token
   */
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.currentUser();
  }

  /**
   * Check if user is authenticated
   */
  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  /**
   * Update user profile
   */
  updateProfile(user: Partial<User>): Observable<AuthResponse> {
    return this.http.put<AuthResponse>(`${this.apiUrl}/auth/profile`, user).pipe(
      tap(response => {
        if (response.success && response.user) {
          this.updateCurrentUser(response.user);
        }
      })
    );
  }

  /**
   * Add new address
   */
  addAddress(address: Address): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/addresses`, address).pipe(
      tap(response => {
        if (response.success && response.user) {
          this.updateCurrentUser(response.user);
        }
      })
    );
  }

  /**
   * Get user's default address
   */
  getDefaultAddress(): Address | null {
    const user = this.getCurrentUser();
    if (user && user.addresses && user.addresses.length > 0) {
      const defaultAddr = user.addresses.find(addr => addr.isDefault);
      return defaultAddr || user.addresses[0];
    }
    return null;
  }

  /**
   * Handle successful authentication
   */
  private handleAuthSuccess(user: User, token: string): void {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('current_user', JSON.stringify(user));
    this.currentUserSubject.next(user);
    this.currentUser.set(user);
    this.isAuthenticated.set(true);
  }

  /**
   * Update current user in memory and storage
   */
  private updateCurrentUser(user: User): void {
    localStorage.setItem('current_user', JSON.stringify(user));
    this.currentUserSubject.next(user);
    this.currentUser.set(user);
  }

  /**
   * Mock login (for development without backend)
   * Remove this in production!
   */
  mockLogin(email: string, password: string): void {
    const mockUser: User = {
      id: 'mock-user-1',
      name: 'Ramesh Kumar',
      email: email,
      phone: '9876543210',
      addresses: [
        {
          id: 'addr-1',
          addressLine: 'No.338, Vijaya Nagar, 6th Main Road, Velachery',
          city: 'Chennai',
          state: 'Tamil Nadu',
          pincode: '600042',
          isDefault: true
        }
      ],
      createdAt: new Date().toISOString()
    };
    
    const mockToken = 'mock-jwt-token-' + Date.now();
    this.handleAuthSuccess(mockUser, mockToken);
  }
}
