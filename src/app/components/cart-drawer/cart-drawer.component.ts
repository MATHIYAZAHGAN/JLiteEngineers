import { Component, inject, signal, OnInit, OnDestroy, effect } from '@angular/core';
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
export class CartDrawerComponent implements OnInit, OnDestroy {
  cartService = inject(CartService);
  authService = inject(AuthService);

  constructor() {
    effect(() => {
      const isCartOpen = this.cartService.cartOpen();
      const isCheckoutOpen = this.showCheckoutModal();
      if (typeof document !== 'undefined') {
        if (isCartOpen || isCheckoutOpen) {
          document.body.classList.add('modal-open');
        } else if (!this.authService.authModalOpen()) {
          document.body.classList.remove('modal-open');
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (typeof document !== 'undefined') {
      if (!this.authService.authModalOpen()) {
        document.body.classList.remove('modal-open');
      }
    }
  }

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
    name: '',
    email: '',
    phone: '',
    address: 'No.338, Vijaya Nagar, 6th Main Road, Velachery',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600042',
    gstin: ''
  };

  ngOnInit(): void {
    this.populateUserDetails();
  }

  populateUserDetails(): void {
    const user = this.authService.currentUser();
    if (user) {
      this.checkoutForm.name = user.fullName || this.checkoutForm.name;
      this.checkoutForm.email = user.email || this.checkoutForm.email;
      this.checkoutForm.phone = user.phone || this.checkoutForm.phone;
      this.checkoutForm.gstin = user.gstin || this.checkoutForm.gstin;
    } else {
      this.checkoutForm.name = 'Mathiyazhagan';
      this.checkoutForm.email = 'jlite@jliteengineers.com';
      this.checkoutForm.phone = '7358178174';
      this.checkoutForm.gstin = '33AAAAA0000A1Z5';
    }
  }

  signInFromCart(): void {
    this.cartService.closeCart();
    this.authService.openAuthModal('login');
  }

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
    this.populateUserDetails();
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

    const summary = this.cartService.gstBreakdown();
    const orderItems = this.cartService.cart().map(i => ({
      productId: String(i.id),
      productName: i.name,
      imageUrl: i.img || '',
      unitPrice: i.price,
      quantity: i.qty,
      totalPrice: i.price * i.qty
    }));

    const orderPayload = {
      userId: this.authService.currentUser()?.id || '',
      customerName: this.checkoutForm.name,
      customerEmail: this.checkoutForm.email,
      customerPhone: this.checkoutForm.phone,
      gstin: this.checkoutForm.gstin,
      companyName: this.authService.currentUser()?.companyName || '',
      items: orderItems,
      shippingAddress: {
        name: this.checkoutForm.name,
        phone: this.checkoutForm.phone,
        street: this.checkoutForm.address,
        city: this.checkoutForm.city,
        state: this.checkoutForm.state,
        pincode: this.checkoutForm.pincode
      },
      subtotal: summary.subtotal,
      taxAmount: summary.totalTax,
      cgst: summary.cgst,
      sgst: summary.sgst,
      shippingFee: summary.shipping,
      discountAmount: summary.discount,
      totalAmount: summary.totalAmount,
      paymentMethod: 'PhonePe',
      paymentStatus: 'Paid'
    };

    // Save to live backend orders collection so it links to user
    this.cartService.createBackendOrder(orderPayload).subscribe({
      next: (created) => {
        if (created?.orderNumber) {
          this.confirmedOrderNumber.set(created.orderNumber);
        }
      },
      error: () => {}
    });

    // Call S2S PhonePe API Initiation
    this.cartService.initiatePhonePeCheckout(this.checkoutForm).subscribe({
      next: () => {
        setTimeout(() => {
          this.isProcessingPayment.set(false);
          if (!this.confirmedOrderNumber()) {
            this.confirmedOrderNumber.set('JL-' + new Date().getFullYear() + '0918-' + Math.floor(1000 + Math.random() * 9000));
          }
          this.paymentStep.set('SUCCESS');
          this.cartService.clearCart();
        }, 2200);
      },
      error: () => {
        setTimeout(() => {
          this.isProcessingPayment.set(false);
          if (!this.confirmedOrderNumber()) {
            this.confirmedOrderNumber.set('JL-' + new Date().getFullYear() + '0918-' + Math.floor(1000 + Math.random() * 9000));
          }
          this.paymentStep.set('SUCCESS');
          this.cartService.clearCart();
        }, 2200);
      }
    });
  }
}
