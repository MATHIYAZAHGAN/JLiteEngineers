import { Component, inject, signal, OnInit, OnDestroy, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, OrderRecord } from '../../services/auth.service';
import { PolicyService } from '../../services/policy.service';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent implements OnInit, OnDestroy {
  authService = inject(AuthService);
  policyService = inject(PolicyService);

  constructor() {
    effect(() => {
      const isOpen = this.authService.authModalOpen();
      if (typeof document !== 'undefined') {
        if (isOpen) {
          document.body.classList.add('modal-open');
        } else {
          document.body.classList.remove('modal-open');
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (typeof document !== 'undefined') {
      document.body.classList.remove('modal-open');
    }
  }

  // Forms data
  loginData = {
    email: '',
    password: '',
    rememberMe: true
  };

  registerData = {
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    accountType: 'Customer' as 'Customer' | 'Contractor',
    companyName: '',
    gstin: '',
    acceptTerms: false
  };

  forgotEmail = '';
  resetData = {
    token: '',
    newPassword: '',
    confirmPassword: ''
  };

  changePasswordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  // UI state
  showPassword = signal<boolean>(false);
  showConfirmPassword = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  // Account Subtab
  accountSubTab = signal<'profile' | 'orders' | 'security'>('profile');
  userOrders = signal<OrderRecord[]>([]);
  ordersLoading = signal<boolean>(false);

  ngOnInit(): void {
    // If user is already logged in and opens modal, load orders
    if (this.authService.isLoggedIn()) {
      this.loadOrders();
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword.update(v => !v);
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword.update(v => !v);
  }

  clearMessages(): void {
    this.errorMessage.set(null);
    this.successMessage.set(null);
  }

  switchTab(tab: 'login' | 'register' | 'forgot-password' | 'account' | 'orders'): void {
    this.clearMessages();
    this.authService.setTab(tab);
    if (tab === 'account' || tab === 'orders') {
      this.accountSubTab.set(tab === 'orders' ? 'orders' : 'profile');
      this.loadOrders();
    }
  }

  // Password strength checks
  get hasMinLength(): boolean {
    return (this.registerData.password || '').length >= 8;
  }
  get hasUpperCase(): boolean {
    return /[A-Z]/.test(this.registerData.password || '');
  }
  get hasLowerCase(): boolean {
    return /[a-z]/.test(this.registerData.password || '');
  }
  get hasNumber(): boolean {
    return /[0-9]/.test(this.registerData.password || '');
  }
  get hasSpecialChar(): boolean {
    return /[^A-Za-z0-9]/.test(this.registerData.password || '');
  }
  get isPasswordStrong(): boolean {
    return this.hasMinLength && this.hasUpperCase && this.hasLowerCase && this.hasNumber && this.hasSpecialChar;
  }

  onLogin(): void {
    this.clearMessages();
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage.set('Please enter your email and password.');
      return;
    }

    this.isLoading.set(true);
    this.authService.login({
      email: this.loginData.email.trim(),
      password: this.loginData.password
    }).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.successMessage.set(`Welcome back, ${res.user.fullName}!`);
        setTimeout(() => {
          this.authService.closeAuthModal();
          this.clearMessages();
        }, 1200);
      },
      error: (err) => {
        this.isLoading.set(false);
        const msg = err?.error?.message || 'Invalid email or password. Please try again.';
        this.errorMessage.set(msg);
      }
    });
  }

  onRegister(): void {
    this.clearMessages();
    if (!this.registerData.fullName || !this.registerData.email || !this.registerData.phone || !this.registerData.password) {
      this.errorMessage.set('Please fill in all required fields.');
      return;
    }

    if (!this.isPasswordStrong) {
      this.errorMessage.set('Please choose a password meeting all strength requirements.');
      return;
    }

    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.errorMessage.set('Passwords do not match.');
      return;
    }

    if (!this.registerData.acceptTerms) {
      this.errorMessage.set('Please accept the Terms & Conditions and Privacy Policy.');
      return;
    }

    this.isLoading.set(true);
    this.authService.register({
      fullName: this.registerData.fullName.trim(),
      email: this.registerData.email.trim(),
      phone: this.registerData.phone.trim(),
      password: this.registerData.password,
      role: this.registerData.accountType,
      companyName: this.registerData.accountType === 'Contractor' ? this.registerData.companyName : '',
      gstin: this.registerData.accountType === 'Contractor' ? this.registerData.gstin : ''
    }).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.successMessage.set('Account created successfully! Welcome to JLite Engineers.');
        setTimeout(() => {
          this.authService.closeAuthModal();
          this.clearMessages();
        }, 1500);
      },
      error: (err) => {
        this.isLoading.set(false);
        const msg = err?.error?.message || 'Registration failed. Email may already be in use.';
        this.errorMessage.set(msg);
      }
    });
  }

  onForgotPassword(): void {
    this.clearMessages();
    if (!this.forgotEmail.trim()) {
      this.errorMessage.set('Please enter your registered email address.');
      return;
    }

    this.isLoading.set(true);
    this.authService.forgotPassword(this.forgotEmail.trim()).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.successMessage.set(res.message || 'If an account exists for this email, password reset instructions have been sent.');
      },
      error: () => {
        this.isLoading.set(false);
        this.successMessage.set('If an account exists for this email, password reset instructions have been sent.');
      }
    });
  }

  onChangePassword(): void {
    this.clearMessages();
    if (!this.changePasswordData.currentPassword || !this.changePasswordData.newPassword) {
      this.errorMessage.set('Please provide your current and new password.');
      return;
    }

    if (this.changePasswordData.newPassword !== this.changePasswordData.confirmPassword) {
      this.errorMessage.set('New passwords do not match.');
      return;
    }

    this.isLoading.set(true);
    this.authService.changePassword({
      currentPassword: this.changePasswordData.currentPassword,
      newPassword: this.changePasswordData.newPassword
    }).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.successMessage.set(res.message || 'Password changed successfully!');
        this.changePasswordData = { currentPassword: '', newPassword: '', confirmPassword: '' };
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err?.error?.message || 'Failed to update password. Please check your current password.');
      }
    });
  }

  loadOrders(): void {
    this.ordersLoading.set(true);
    this.authService.getUserOrders().subscribe({
      next: (orders) => {
        this.userOrders.set(orders || []);
        this.ordersLoading.set(false);
      },
      error: () => {
        this.ordersLoading.set(false);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.clearMessages();
  }

  viewPolicy(type: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.authService.closeAuthModal();
    this.policyService.scrollToPolicy(type);
  }
}
