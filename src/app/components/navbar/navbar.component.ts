import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  cartService = inject(CartService);
  authService = inject(AuthService);
  
  menuOpen = false;
  accountDropdownOpen = false;

  navLinks = [
    { label: 'About',        id: 'about' },
    { label: 'Products',     id: 'products' },
    { label: 'Contractors', id: 'electrical-contractors' },
    { label: 'Consultancy',  id: 'consultancy-services' },
    { label: 'Lighting',     id: 'light-pitcher' },
    { label: 'Admin',        id: 'admin-portal' },
    { label: 'Contact',      id: 'contact' },
  ];

  get visibleNavLinks() {
    return this.navLinks.filter(link => {
      if (link.id === 'admin-portal') {
        return this.authService.isAdmin();
      }
      return true;
    });
  }

  toggleMenu() { this.menuOpen = !this.menuOpen; }
  closeMenu()  { this.menuOpen = false; }

  toggleAccountDropdown() { 
    this.accountDropdownOpen = !this.accountDropdownOpen; 
  }

  closeAccountDropdown() { 
    this.accountDropdownOpen = false; 
  }

  openLoginModal() {
    this.accountDropdownOpen = false;
    this.authService.openAuthModal('login');
  }

  openRegisterModal() {
    this.accountDropdownOpen = false;
    this.authService.openAuthModal('register');
  }

  openAccountModal(tab: 'account' | 'orders' = 'account') {
    this.accountDropdownOpen = false;
    this.authService.openAuthModal(tab);
  }

  logout() {
    this.accountDropdownOpen = false;
    this.authService.logout();
  }
}
