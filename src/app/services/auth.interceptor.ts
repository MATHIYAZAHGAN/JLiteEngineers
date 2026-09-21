import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

let isRefreshing = false;

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const token = authService.token();

  let modifiedReq = req;

  // Only attach headers for our backend API
  if (req.url.startsWith(environment.apiUrl)) {
    let headers = req.headers;
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    const currentUser = authService.currentUser();
    if (currentUser?.id) {
      headers = headers.set('X-User-Id', currentUser.id);
    }
    modifiedReq = req.clone({ headers });
  }

  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // If 401 received on a non-auth endpoint, attempt session refresh
      const isAuthEndpoint = req.url.includes('/auth/login') ||
                             req.url.includes('/auth/register') ||
                             req.url.includes('/auth/refresh') ||
                             req.url.includes('/auth/forgot-password');

      if (error.status === 401 && !isAuthEndpoint && authService.refreshToken() && !isRefreshing) {
        isRefreshing = true;
        return authService.refreshSession().pipe(
          switchMap(res => {
            isRefreshing = false;
            // Retry the failed request with new access token
            const retryReq = req.clone({
              headers: req.headers.set('Authorization', `Bearer ${res.token}`)
            });
            return next(retryReq);
          }),
          catchError(refreshErr => {
            isRefreshing = false;
            authService.logout();
            return throwError(() => refreshErr);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
