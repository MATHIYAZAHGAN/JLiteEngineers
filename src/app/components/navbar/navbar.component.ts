import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { QuoteService } from '../../services/quote.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  cartService = inject(CartService);
  authService = inject(AuthService);
  quoteService = inject(QuoteService);
  private router = inject(Router);

  menuOpen = false;
  accountDropdownOpen = false;

  navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Products', id: 'products' },
    { label: 'Contractors', id: 'electrical-contractors' },
    { label: 'Consultancy', id: 'consultancy-services' },
    { label: 'Lighting', id: 'light-pitcher' },
    { label: 'Admin', id: 'admin-portal' },
    { label: 'Contact', id: 'contact' },
  ];

  get visibleNavLinks() {
    return this.navLinks.filter(link => {
      if (link.id === 'admin-portal') {
        return this.authService.isAdmin();
      }
      return true;
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    if (typeof document !== 'undefined') {
      if (this.menuOpen) {
        document.body.classList.add('modal-open');
      } else {
        document.body.classList.remove('modal-open');
      }
    }
  }

  closeMenu() {
    this.menuOpen = false;
    if (typeof document !== 'undefined') {
      document.body.classList.remove('modal-open');
    }
  }

  navigateToSection(id: string, event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.closeMenu();
    this.closeAccountDropdown();

    if (id === 'get-quote') {
      this.quoteService.openQuote();
      return;
    }

    setTimeout(() => {
      if (id === 'hero' || id === 'home') {
        if (typeof window !== 'undefined' && window.location.pathname !== '/') {
          this.router.navigate(['/']);
        } else if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          try { history.pushState(null, '', ' '); } catch (_) { }
        }
        return;
      }

      if (typeof document !== 'undefined') {
        const el = document.getElementById(id);
        if (el) {
          const navOffset = 76;
          const targetTop = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
          window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
          try {
            history.pushState(null, '', '#' + id);
          } catch (_) { }
        } else {
          this.router.navigate(['/'], { fragment: id });
        }
      }
    }, 40);
  }

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
