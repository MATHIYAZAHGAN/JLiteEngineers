import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-mobile-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mobile-nav.component.html'
})
export class MobileNavComponent implements OnInit, OnDestroy {
  cartService = inject(CartService);
  authService = inject(AuthService);

  activeTab = signal<string>('home');
  private scrollListener: any;

  ngOnInit(): void {
    this.scrollListener = () => this.detectActiveSection();
    window.addEventListener('scroll', this.scrollListener, { passive: true });
  }

  ngOnDestroy(): void {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  scrollToSection(id: string, tab: string): void {
    this.activeTab.set(tab);
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  openCart(): void {
    this.activeTab.set('cart');
    this.cartService.openCart();
  }

  private detectActiveSection(): void {
    const scrollPos = window.scrollY + 120;
    const sections: Array<{ id: string; tab: string }> = [
      { id: 'contact', tab: 'contact' },
      { id: 'electrical-contractors', tab: 'contractors' },
      { id: 'products', tab: 'products' },
      { id: 'hero', tab: 'home' }
    ];

    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          if (!this.cartService.cartOpen()) {
            this.activeTab.set(s.tab);
          }
          return;
        }
      }
    }

    if (window.scrollY < 200) {
      this.activeTab.set('home');
    }
  }
}
