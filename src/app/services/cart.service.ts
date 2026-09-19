import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface Product {
  id: string | number;
  name: string;
  price: number;
  originalPrice?: number;
  unit: string;
  tag?: string | null;
  tagColor?: string | null;
  type: string;
  desc: string;
  specs: string[];
  img: string;
  imgBg?: string;
  rating?: number;
  stockQuantity?: number;
}

export interface CartItem extends Product {
  qty: number;
}

export interface GSTBreakdown {
  subtotal: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalTax: number;
  shipping: number;
  discount: number;
  totalAmount: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient);

  // Angular Signals for State Management
  cart = signal<CartItem[]>([]);
  cartOpen = signal<boolean>(false);
  gstin = signal<string>('');
  couponCode = signal<string>('');
  discountRate = signal<number>(0);

  // Derived Reactive Signals
  cartCount = computed(() => this.cart().reduce((sum, item) => sum + item.qty, 0));
  subtotal = computed(() => this.cart().reduce((sum, item) => sum + (item.price * item.qty), 0));

  gstBreakdown = computed<GSTBreakdown>(() => {
    const sub = this.subtotal();
    const disc = (sub * this.discountRate());
    const taxable = Math.max(0, sub - disc);
    const taxRate = 0.18; // 18% GST standard on electrical equipment
    const totalTax = Math.round(taxable * taxRate);
    const cgst = Math.round(totalTax / 2);
    const sgst = Math.round(totalTax / 2);
    const shipping = taxable > 4999 || taxable === 0 ? 0 : 250;
    const totalAmount = taxable + totalTax + shipping;

    return {
      subtotal: sub,
      cgst,
      sgst,
      igst: 0,
      totalTax,
      shipping,
      discount: disc,
      totalAmount
    };
  });

  toggleCart(): void {
    this.cartOpen.update(v => !v);
  }

  openCart(): void {
    this.cartOpen.set(true);
  }

  closeCart(): void {
    this.cartOpen.set(false);
  }

  addToCart(product: Product, quantity = 1): void {
    this.cart.update(items => {
      const existing = items.find(i => String(i.id) === String(product.id));
      if (existing) {
        return items.map(i => String(i.id) === String(product.id) ? { ...i, qty: i.qty + quantity } : i);
      }
      return [...items, { ...product, qty: quantity }];
    });
    this.openCart();
  }

  updateQuantity(id: string | number, delta: number): void {
    this.cart.update(items =>
      items.map(i => String(i.id) === String(id) ? { ...i, qty: i.qty + delta } : i)
           .filter(i => i.qty > 0)
    );
  }

  removeFromCart(id: string | number): void {
    this.cart.update(items => items.filter(i => String(i.id) !== String(id)));
  }

  clearCart(): void {
    this.cart.set([]);
  }

  applyCoupon(code: string): boolean {
    const validCoupons: Record<string, number> = {
      'JLITE10': 0.10,
      'CONTRACTOR5': 0.05,
      'FREESHIP': 0.00
    };
    const codeUpper = code.trim().toUpperCase();
    if (validCoupons[codeUpper] !== undefined) {
      this.couponCode.set(codeUpper);
      this.discountRate.set(validCoupons[codeUpper]);
      return true;
    }
    return false;
  }

  initiatePhonePeCheckout(customerDetails: { name: string; phone: string; email: string; address: string; gstin?: string }) {
    const summary = this.gstBreakdown();
    const payload = {
      amount: summary.totalAmount,
      phone: customerDetails.phone,
      redirectUrl: `${window.location.origin}/cart?paymentStatus=success`,
      callbackUrl: `${environment.apiUrl}/payments/phonepe/webhook`
    };

    return this.http.post<{ success: boolean; redirectUrl: string; merchantTransactionId: string }>(
      `${environment.apiUrl}/payments/phonepe/initiate`,
      payload
    );
  }
}
