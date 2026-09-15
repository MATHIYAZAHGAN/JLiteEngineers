import { Component, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, LoginRequest, RegisterRequest } from '../../services/auth.service';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent {
  // Outputs
  onClose = output<void>();
  onContinueAsGuest = output<void>();
  onLoginSuccess = output<void>();

  // State
  mode = signal<'login' | 'register'>('login');
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');

  // Login Form
  loginEmail = signal<string>('');
  loginPassword = signal<string>('');

  // Register Form
  registerName = signal<string>('');
  registerEmail = signal<string>('');
  registerPhone = signal<string>('');
  registerPassword = signal<string>('');
  registerConfirmPassword = signal<string>('');

  constructor(private authService: AuthService) {}

  /**
   * Switch between login and register
   */
  switchMode(newMode: 'login' | 'register'): void {
    this.mode.set(newMode);
    this.errorMessage.set('');
  }

  /**
   * Handle login
   */
  handleLogin(): void {
    this.errorMessage.set('');
    
    const email = this.loginEmail().trim();
    const password = this.loginPassword().trim();

    if (!email || !password) {
      this.errorMessage.set('Please enter email and password');
      return;
    }

    if (!this.isValidEmail(email)) {
      this.errorMessage.set('Please enter a valid email address');
      return;
    }

    this.isLoading.set(true);

    // For development: Use mock login
    // In production: Replace with actual API call
    setTimeout(() => {
      this.authService.mockLogin(email, password);
      this.isLoading.set(false);
      this.onLoginSuccess.emit();
    }, 800);

    /* Production API call:
    const request: LoginRequest = { email, password };
    this.authService.login(request).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        if (response.success) {
          this.onLoginSuccess.emit();
        } else {
          this.errorMessage.set(response.message || 'Login failed');
        }
      },
      error: (error) => {
        this.isLoading.set(false);
        this.errorMessage.set(error.error?.message || 'Login failed. Please try again.');
      }
    });
    */
  }

  /**
   * Handle registration
   */
  handleRegister(): void {
    this.errorMessage.set('');

    const name = this.registerName().trim();
    const email = this.registerEmail().trim();
    const phone = this.registerPhone().trim();
    const password = this.registerPassword().trim();
    const confirmPassword = this.registerConfirmPassword().trim();

    // Validation
    if (!name || !email || !phone || !password) {
      this.errorMessage.set('All fields are required');
      return;
    }

    if (!this.isValidEmail(email)) {
      this.errorMessage.set('Please enter a valid email address');
      return;
    }

    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      this.errorMessage.set('Please enter a valid 10-digit mobile number');
      return;
    }

    if (password.length < 6) {
      this.errorMessage.set('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      this.errorMessage.set('Passwords do not match');
      return;
    }

    this.isLoading.set(true);

    // For development: Use mock registration
    setTimeout(() => {
      this.authService.mockLogin(email, password);
      this.isLoading.set(false);
      this.onLoginSuccess.emit();
    }, 1000);

    /* Production API call:
    const request: RegisterRequest = { name, email, phone, password };
    this.authService.register(request).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        if (response.success) {
          this.onLoginSuccess.emit();
        } else {
          this.errorMessage.set(response.message || 'Registration failed');
        }
      },
      error: (error) => {
        this.isLoading.set(false);
        this.errorMessage.set(error.error?.message || 'Registration failed. Please try again.');
      }
    });
    */
  }

  /**
   * Close modal
   */
  close(): void {
    this.onClose.emit();
  }

  /**
   * Continue as guest
   */
  continueAsGuest(): void {
    this.onContinueAsGuest.emit();
  }

  /**
   * Email validation
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
