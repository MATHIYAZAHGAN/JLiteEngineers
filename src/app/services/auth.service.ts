import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, catchError, of, throwError, BehaviorSubject, switchMap, filter, take } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'Customer' | 'Contractor' | 'Admin';
  companyName?: string;
  gstin?: string;
  isB2BVerified?: boolean;
  addresses?: any[];
  createdAt?: string;
}

export interface AuthResponse {
  message?: string;
  token: string;
  refreshToken: string;
  user: UserProfile;
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  createdAt: string;
  orderStatus: string;
  paymentStatus: string;
  totalAmount: number;
  items: Array<{
    productId: string;
    productName: string;
    unitPrice: number;
    quantity: number;
    totalPrice: number;
    imageUrl?: string;
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  // Reactive State Signals
  currentUser = signal<UserProfile | null>(this.getStoredUser());
  token = signal<string | null>(this.getStoredToken());
  refreshToken = signal<string | null>(this.getStoredRefreshToken());

  // Modal State Signals
  authModalOpen = signal<boolean>(false);
  authModalTab = signal<'login' | 'register' | 'forgot-password' | 'account' | 'orders'>('login');

  // Computed Roles & Auth Status
  isLoggedIn = computed(() => !!this.currentUser());
  isAdmin = computed(() => {
    const role = (this.currentUser()?.role || '').toLowerCase();
    return role === 'admin';
  });
  isContractor = computed(() => {
    const role = (this.currentUser()?.role || '').toLowerCase();
    return role === 'contractor' || role === 'admin';
  });
  userInitials = computed(() => {
    const user = this.currentUser();
    if (!user || !user.fullName) return 'U';
    const parts = user.fullName.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return user.fullName.substring(0, 2).toUpperCase();
  });

  // State management for refresh handling in interceptor
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  constructor() {
    this.initializeAuth();
  }

  // Open & Close Auth Modal
  openAuthModal(tab: 'login' | 'register' | 'forgot-password' | 'account' | 'orders' = 'login'): void {
    if (this.isLoggedIn() && (tab === 'login' || tab === 'register')) {
      this.authModalTab.set('account');
    } else {
      this.authModalTab.set(tab);
    }
    this.authModalOpen.set(true);
  }

  closeAuthModal(): void {
    this.authModalOpen.set(false);
  }

  setTab(tab: 'login' | 'register' | 'forgot-password' | 'account' | 'orders'): void {
    this.authModalTab.set(tab);
  }

  // Initialize and verify stored session
  initializeAuth(): void {
    const storedToken = this.token();
    if (storedToken) {
      // Validate session against backend /api/auth/me
      this.getCurrentUser().subscribe({
        next: (res) => {
          if (res && res.user) {
            this.currentUser.set(res.user);
            this.saveStorageUser(res.user);
          }
        },
        error: () => {
          // Token expired, attempt refresh
          const storedRefresh = this.refreshToken();
          if (storedRefresh) {
            this.refreshSession().subscribe({
              error: () => this.clearSession()
            });
          } else {
            this.clearSession();
          }
        }
      });
    }
  }

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, credentials).pipe(
      tap(res => {
        this.setSession(res);
      })
    );
  }

  register(userData: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    role?: string;
    companyName?: string;
    gstin?: string;
  }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register`, userData).pipe(
      tap(res => {
        if (res.token) {
          this.setSession(res);
        }
      })
    );
  }

  getCurrentUser(): Observable<{ user: UserProfile }> {
    const token = this.token();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    const userId = this.currentUser()?.id;
    if (userId) {
      headers = headers.set('X-User-Id', userId);
    }

    return this.http.get<{ user: UserProfile }>(`${environment.apiUrl}/auth/me`, { headers });
  }

  refreshSession(): Observable<AuthResponse> {
    const refresh = this.refreshToken();
    if (!refresh) {
      this.clearSession();
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/refresh`, { refreshToken: refresh }).pipe(
      tap(res => {
        this.setSession(res);
      }),
      catchError(err => {
        this.clearSession();
        return throwError(() => err);
      })
    );
  }

  forgotPassword(email: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${environment.apiUrl}/auth/forgot-password`, { email });
  }

  resetPassword(data: { token: string; newPassword: string }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${environment.apiUrl}/auth/reset-password`, data);
  }

  changePassword(data: { currentPassword: string; newPassword: string }): Observable<{ message: string }> {
    const user = this.currentUser();
    if (!user) return throwError(() => new Error('Not authenticated'));

    return this.http.post<{ message: string }>(`${environment.apiUrl}/auth/change-password`, {
      userId: user.id,
      currentPassword: data.currentPassword,
      newPassword: data.newPassword
    });
  }

  getUserOrders(): Observable<OrderRecord[]> {
    const user = this.currentUser();
    if (!user) return of([]);

    return this.http.get<OrderRecord[]>(`${environment.apiUrl}/orders/user/${user.id}`);
  }

  logout(): void {
    const token = this.token();
    const user = this.currentUser();
    const refresh = this.refreshToken();

    if (token || user) {
      this.http.post(`${environment.apiUrl}/auth/logout`, {
        userId: user?.id,
        refreshToken: refresh
      }).subscribe({
        next: () => {},
        error: () => {}
      });
    }

    this.clearSession();
    this.closeAuthModal();
  }

  private setSession(authResult: AuthResponse): void {
    if (authResult.token) {
      localStorage.setItem('jlite_token', authResult.token);
      this.token.set(authResult.token);
    }
    if (authResult.refreshToken) {
      localStorage.setItem('jlite_refresh_token', authResult.refreshToken);
      this.refreshToken.set(authResult.refreshToken);
    }
    if (authResult.user) {
      this.saveStorageUser(authResult.user);
      this.currentUser.set(authResult.user);
    }
  }

  private clearSession(): void {
    localStorage.removeItem('jlite_token');
    localStorage.removeItem('jlite_refresh_token');
    localStorage.removeItem('jlite_user');
    this.token.set(null);
    this.refreshToken.set(null);
    this.currentUser.set(null);
  }

  private saveStorageUser(user: UserProfile): void {
    localStorage.setItem('jlite_user', JSON.stringify(user));
  }

  private getStoredToken(): string | null {
    return localStorage.getItem('jlite_token');
  }

  private getStoredRefreshToken(): string | null {
    return localStorage.getItem('jlite_refresh_token');
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
