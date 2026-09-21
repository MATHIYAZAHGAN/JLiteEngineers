import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard = (): boolean => {
  const authService = inject(AuthService);
  if (authService.isLoggedIn()) {
    return true;
  }
  authService.openAuthModal('login');
  return false;
};

export const adminGuard = (): boolean => {
  const authService = inject(AuthService);
  if (authService.isAdmin()) {
    return true;
  }
  if (!authService.isLoggedIn()) {
    authService.openAuthModal('login');
  }
  return false;
};
