import { Injectable, signal } from '@angular/core';

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
  selectedItem = signal<QuotePrefill | null>(null);
  isOpen = signal<boolean>(false);

  openQuote(item?: QuotePrefill) {
    this.isOpen.set(true);
    if (item) {
      this.selectedItem.set(item);
    }

    // Smooth scroll to #get-quote section with fixed nav offset
    setTimeout(() => {
      const el = document.getElementById('get-quote');
      if (el) {
        const navOffset = 76;
        const targetTop = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
        window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
        try {
          history.pushState(null, '', '#get-quote');
        } catch (_) {}
      }
    }, 60);
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
