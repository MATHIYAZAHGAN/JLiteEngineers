import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

export interface ProductQuoteRequest {
  productName: string;
  productPrice: number;
  productDetails: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private quoteRequestSubject = new Subject<ProductQuoteRequest>();
  quoteRequest$ = this.quoteRequestSubject.asObservable();

  requestQuote(product: ProductQuoteRequest) {
    this.quoteRequestSubject.next(product);
    
    // Scroll to get-quote section with smooth animation
    setTimeout(() => {
      const getQuoteSection = document.getElementById('get-quote');
      if (getQuoteSection) {
        getQuoteSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }
}
