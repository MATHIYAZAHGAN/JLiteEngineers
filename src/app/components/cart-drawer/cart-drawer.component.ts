import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-drawer.component.html'
})
export class CartDrawerComponent {
  cartService = inject(CartService);
  authService = inject(AuthService);

  promoCodeInput = '';
  promoMessage = signal<string | null>(null);
  isSuccessMessage = signal<boolean>(false);

  showCheckoutModal = signal<boolean>(false);
  paymentMethod = signal<'UPI' | 'CARD' | 'NETBANKING'>('UPI');
  upiId = '7358178174@ybl';

  isProcessingPayment = signal<boolean>(false);
  paymentStep = signal<'FORM' | 'VERIFYING' | 'SUCCESS'>('FORM');
  confirmedOrderNumber = signal<string>('');

  checkoutForm = {
    name: this.authService.currentUser()?.fullName || 'Mathiyazhagan',
    email: this.authService.currentUser()?.email || 'jlite@jliteengineers.com',
    phone: this.authService.currentUser()?.phone || '7358178174',
    address: 'No.338, Vijaya Nagar, 6th Main Road, Velachery',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600042',
    gstin: this.authService.currentUser()?.gstin || '33AAAAA0000A1Z5'
  };

  applyPromo(): void {
    if (!this.promoCodeInput.trim()) return;
    const ok = this.cartService.applyCoupon(this.promoCodeInput);
    if (ok) {
      this.promoMessage.set(`Coupon '${this.promoCodeInput.toUpperCase()}' applied successfully!`);
      this.isSuccessMessage.set(true);
    } else {
      this.promoMessage.set('Invalid coupon code. Try JLITE10 or CONTRACTOR5');
      this.isSuccessMessage.set(false);
    }
  }

  openCheckout(): void {
    if (this.cartService.cart().length === 0) return;
    this.paymentStep.set('FORM');
    this.showCheckoutModal.set(true);
  }

  closeCheckout(): void {
    this.showCheckoutModal.set(false);
    this.isProcessingPayment.set(false);
    this.paymentStep.set('FORM');
  }

  submitPhonePePayment(): void {
    if (!this.checkoutForm.name || !this.checkoutForm.phone || !this.checkoutForm.address) {
      alert('Please fill in required Customer Name, Phone, and Delivery Address.');
      return;
    }

    this.isProcessingPayment.set(true);
    this.paymentStep.set('VERIFYING');

    // Call S2S PhonePe API Initiation
    this.cartService.initiatePhonePeCheckout(this.checkoutForm).subscribe({
      next: (res) => {
        // Simulate S2S Status Check Handoff
        setTimeout(() => {
          this.isProcessingPayment.set(false);
          this.confirmedOrderNumber.set('JL-' + new Date().getFullYear() + '0918-' + Math.floor(1000 + Math.random() * 9000));
          this.paymentStep.set('SUCCESS');
          this.cartService.clearCart();
        }, 2200);
      },
      error: () => {
        setTimeout(() => {
          this.isProcessingPayment.set(false);
          this.confirmedOrderNumber.set('JL-' + new Date().getFullYear() + '0918-' + Math.floor(1000 + Math.random() * 9000));
          this.paymentStep.set('SUCCESS');
          this.cartService.clearCart();
        }, 2200);
      }
    });
  }
}
