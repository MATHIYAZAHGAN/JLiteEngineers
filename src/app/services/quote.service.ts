import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';

export interface QuotePrefill {
  productName: string;
  category?: string;
  specs?: string;
  details?: string;
  img?: string;
  badge?: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private router = inject(Router, { optional: true });
  selectedItem = signal<QuotePrefill | null>(null);
  isOpen = signal<boolean>(false);

  openQuote(item?: QuotePrefill) {
    this.isOpen.set(true);
    if (item) {
      this.selectedItem.set(item);
    }

    if (typeof window !== 'undefined' && window.location.pathname !== '/' && this.router) {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => this.scrollToQuote(), 120);
      });
      return;
    }

    setTimeout(() => this.scrollToQuote(), 60);
  }

  private scrollToQuote(): void {
    if (typeof document === 'undefined') return;
    const el = document.getElementById('get-quote');
    if (el) {
      const navOffset = 76;
      const targetTop = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
      try {
        history.pushState(null, '', '#get-quote');
      } catch (_) {}
    }
  }

  requestQuoteFor(item: QuotePrefill) {
    this.openQuote(item);
  }

  closeQuote() {
    this.isOpen.set(false);
    this.selectedItem.set(null);
  }

  clearSelection() {
    this.selectedItem.set(null);
  }
}
