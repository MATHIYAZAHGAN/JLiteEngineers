import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { ApiService, CreatePaymentRequest, PaymentStatusResponse } from '../../services/api.service';
import { QuoteService } from '../../services/quote.service';
import { AuthService, User } from '../../services/auth.service';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';

export interface Product {
  id: number;
  name: string;
  price: number;
  unit: string;
  tag: string | null;
  tagColor: string | null;
  type: string;
  desc: string;
  specs: string[];
  img: string;
  imgBg: string;
}

export interface CartItem extends Product { qty: number; }

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ScrollRevealDirective, AuthModalComponent],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [
    {
      id: 1, name: 'JJ MCB 32A', price: 1499, unit: '/pc',
      tag: 'Best Seller', tagColor: 'elec', type: 'mcb',
      desc: 'Double-pole miniature circuit breaker, 6kA breaking capacity.',
      specs: ['32A', '6kA', 'IEC 60898'],
      img: 'assets/Picture1.jpg', imgBg: '#EFF6FF',
    },
    {
      id: 2, name: 'Smart LED Panel 18W', price: 1999, unit: '/pc',
      tag: 'New', tagColor: 'green', type: 'led',
      desc: 'Slim recessed LED panel, CCT tunable 3000K–6500K, Wi-Fi ready.',
      specs: ['18W', '1800lm', 'IP44'],
      img: 'assets/Picture2.jpg', imgBg: '#FFFBEB',
    },
    {
      id: 3, name: 'JJ Smart Switch', price: 2699, unit: '/pc',
      tag: null, tagColor: null, type: 'switch',
      desc: 'Touch-capacitive smart switch with Wi-Fi, works with Alexa & Google.',
      specs: ['10A', '2.4GHz', 'Zigbee'],
      img: 'assets/work/Picture3.jpg', imgBg: '#F8FAFC',
    },
    {
      id: 4, name: 'DB Box 8-Way', price: 5499, unit: '/pc',
      tag: 'New', tagColor: 'green', type: 'db',
      desc: 'Surface-mount distribution board, 8-way, with transparent door.',
      specs: ['8-Way', 'IP40', 'DIN Rail'],
      img: 'assets/work/Picture4.jpg', imgBg: '#F1F5F9',
    },
    {
      id: 5, name: 'RCCB 63A 30mA', price: 3499, unit: '/pc',
      tag: null, tagColor: null, type: 'rccb',
      desc: 'Residual current circuit breaker for earth leakage protection.',
      specs: ['63A', '30mA', 'IEC 61008'],
      img: 'assets/work/Picture13.jpg', imgBg: '#EFF6FF',
    },
    {
      id: 6, name: 'Armoured Cable 4mm', price: 699, unit: '/m',
      tag: 'Best Seller', tagColor: 'elec', type: 'cable',
      desc: '4-core SWA armoured cable for underground and industrial use.',
      specs: ['4×4mm²', '0.6/1kV', 'BS5467'],
      img: 'assets/Picture6.jpg', imgBg: '#F1F5F9',
    },
    {
      id: 7, name: 'LED Batten 40W', price: 1599, unit: '/pc',
      tag: null, tagColor: null, type: 'batten',
      desc: 'Surface-mount LED batten fitting, 4ft, 4000lm, IP65 rated.',
      specs: ['40W', '4000lm', 'IP65'],
      img: 'assets/Picture7.jpg', imgBg: '#FFFBEB',
    },
    {
      id: 8, name: 'Surge Protector SPD', price: 4599, unit: '/pc',
      tag: 'New', tagColor: 'green', type: 'spd',
      desc: 'Type 2 surge protection device for DIN rail, 40kA peak current.',
      specs: ['40kA', 'Type 2', 'IEC 61643'],
      img: 'assets/Picture8.jpg', imgBg: '#EFF6FF',
    },
    {
      id: 9, name: 'Modular Switch 6A', price: 349, unit: '/pc',
      tag: null, tagColor: null, type: 'switch',
      desc: 'Premium modular switch with piano-key mechanism, 6A rated.',
      specs: ['6A', '250V', 'ISI Mark'],
      img: 'assets/Picture14.jpg', imgBg: '#F8FAFC',
    },
    {
      id: 10, name: 'HRC Fuse 100A', price: 899, unit: '/pc',
      tag: 'Best Seller', tagColor: 'elec', type: 'spd',
      desc: 'High rupturing capacity fuse for industrial switchgear panels.',
      specs: ['100A', '415V', 'BS88'],
      img: 'assets/Picture30.jpg', imgBg: '#EFF6FF',
    },
    {
      id: 11, name: 'LED Downlight 12W', price: 1199, unit: '/pc',
      tag: 'New', tagColor: 'green', type: 'led',
      desc: 'Recessed LED downlight, dimmable, 1100lm, warm white 3000K.',
      specs: ['12W', '1100lm', 'IP20'],
      img: 'assets/Picture31.jpg', imgBg: '#FFFBEB',
    },
    {
      id: 12, name: 'Contactor 40A 3P', price: 2299, unit: '/pc',
      tag: null, tagColor: null, type: 'mcb',
      desc: '3-pole AC contactor for motor control and power switching.',
      specs: ['40A', '3-Pole', 'IEC 60947'],
      img: 'assets/Picture32.jpg', imgBg: '#EFF6FF',
    },
  ];

  categories = ['All', 'Switchgear', 'Lighting', 'Wiring', 'Smart'];
  activeCategory = signal('All');

  filteredProducts = computed(() => {
    const cat = this.activeCategory();
    if (cat === 'All') return this.products;
    const map: Record<string, string[]> = {
      Switchgear: ['mcb', 'rccb', 'db', 'spd'],
      Lighting:   ['led', 'batten'],
      Wiring:     ['cable'],
      Smart:      ['switch'],
    };
    return this.products.filter(p => map[cat]?.includes(p.type));
  });

  cart = signal<CartItem[]>([]);
  cartOpen = signal(false);

  // Authentication modal state
  authModalOpen = signal(false);
  isGuest = signal(false);

  // Checkout modal & payment processing state
  checkoutOpen = signal(false);
  isProcessingPayment = signal(false);
  paymentError = signal<string | null>(null);
  selectedTab = signal<'upi' | 'gpay' | 'card' | 'netbanking'>('upi');

  // Receipt Modal State
  receiptModalOpen = signal(false);
  paymentReceipt = signal<PaymentStatusResponse | null>(null);
  isVerifyingStatus = signal(false);

  // Customer shipping details with local storage restore
  customer = signal({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: 'Chennai',
    pincode: '600001'
  });

  cartCount = computed(() => this.cart().reduce((s, i) => s + i.qty, 0));
  cartTotal = computed(() => this.cart().reduce((s, i) => s + i.price * i.qty, 0));

  constructor(
    private apiService: ApiService, 
    private quoteService: QuoteService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.restoreSavedCustomer();
    this.checkReturnPaymentStatus();
    
    // Auto-fill customer details if logged in
    if (this.authService.isLoggedIn()) {
      this.prefillLoggedInUserData();
    }
  }

  private prefillLoggedInUserData() {
    const user = this.authService.getCurrentUser();
    if (user) {
      const defaultAddress = this.authService.getDefaultAddress();
      this.customer.set({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: defaultAddress?.addressLine || '',
        city: defaultAddress?.city || 'Chennai',
        pincode: defaultAddress?.pincode || '600001'
      });
    }
  }

  private restoreSavedCustomer() {
    try {
      const saved = localStorage.getItem('jlite_customer_info');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.customer.set({ ...this.customer(), ...parsed });
      }
    } catch (e) {
      // ignore
    }
  }

  private checkReturnPaymentStatus() {
    const params = new URLSearchParams(window.location.search);
    const txnId = params.get('txnId');
    const status = params.get('paymentStatus');

    if (txnId && status === 'check') {
      this.isVerifyingStatus.set(true);

      // Verify transaction status strictly with ASP.NET Core API backend
      this.apiService.checkPaymentStatus(txnId).subscribe({
        next: (res) => {
          this.isVerifyingStatus.set(false);
          this.paymentReceipt.set(res);
          this.receiptModalOpen.set(true);

          // Clear cart on successful payment
          if (res.success && res.code === 'PAYMENT_SUCCESS') {
            this.cart.set([]);
          }

          // Clean query params from browser URL bar without reloading
          window.history.replaceState({}, document.title, window.location.pathname);
        },
        error: (err) => {
          this.isVerifyingStatus.set(false);
          console.error('Error verifying payment status', err);
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      });
    }
  }

  setCategory(cat: string) { this.activeCategory.set(cat); }

  addToCart(product: Product) {
    this.cart.update(items => {
      const ex = items.find(i => i.id === product.id);
      if (ex) return items.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...items, { ...product, qty: 1 }];
    });
    this.cartOpen.set(true);
  }

  removeFromCart(id: number) {
    this.cart.update(items => items.filter(i => i.id !== id));
  }

  updateQty(id: number, delta: number) {
    this.cart.update(items =>
      items.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0)
    );
  }

  toggleCart() { this.cartOpen.update(v => !v); }
  closeCart()  { this.cartOpen.set(false); }

  openCheckout() {
    if (this.cart().length === 0) return;
    
    this.cartOpen.set(false);
    
    // Check if user is logged in
    if (!this.authService.isLoggedIn() && !this.isGuest()) {
      // Show auth modal - user must login or continue as guest
      this.authModalOpen.set(true);
    } else {
      // User is logged in or chose guest checkout - proceed to payment
      this.paymentError.set(null);
      this.checkoutOpen.set(true);
    }
  }

  closeCheckout() {
    if (this.isProcessingPayment()) return;
    this.checkoutOpen.set(false);
  }

  // Auth Modal Handlers
  handleAuthLoginSuccess() {
    this.authModalOpen.set(false);
    this.isGuest.set(false);
    this.prefillLoggedInUserData();
    this.checkoutOpen.set(true);
  }

  handleAuthContinueAsGuest() {
    this.authModalOpen.set(false);
    this.isGuest.set(true);
    this.checkoutOpen.set(true);
  }

  handleAuthClose() {
    this.authModalOpen.set(false);
  }

  closeReceiptModal() {
    this.receiptModalOpen.set(false);
    this.paymentReceipt.set(null);
  }

  retryPayment() {
    this.receiptModalOpen.set(false);
    this.paymentReceipt.set(null);
    this.paymentError.set(null);
    this.checkoutOpen.set(true);
  }

  setTab(tab: 'upi' | 'gpay' | 'card' | 'netbanking') {
    this.selectedTab.set(tab);
  }

  updateCustomerField(field: string, value: string) {
    this.customer.update(c => {
      const updated = { ...c, [field]: value };
      try {
        localStorage.setItem('jlite_customer_info', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  }

  processPhonePePayment() {
    const cust = this.customer();

    if (!cust.name.trim()) {
      this.paymentError.set('Please enter your Full Name.');
      return;
    }

    if (!cust.phone.trim() || cust.phone.trim().length < 10) {
      this.paymentError.set('Please enter a valid 10-digit Indian Mobile Number for PhonePe UPI.');
      return;
    }

    if (!cust.email.trim() || !cust.email.includes('@')) {
      this.paymentError.set('Please enter a valid email address to receive order receipts.');
      return;
    }

    if (!cust.address.trim()) {
      this.paymentError.set('Please enter your complete delivery address.');
      return;
    }

    if (this.cart().length === 0) {
      this.paymentError.set('Your cart is empty.');
      return;
    }

    this.paymentError.set(null);
    this.isProcessingPayment.set(true);

    const checkoutRequest: CreatePaymentRequest = {
      customerName: cust.name,
      customerEmail: cust.email,
      customerPhone: cust.phone,
      shippingAddress: cust.address,
      city: cust.city || 'Chennai',
      pincode: cust.pincode || '600001',
      totalAmount: this.cartTotal(),
      items: this.cart().map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.qty
      }))
    };

    this.apiService.initiatePayment(checkoutRequest).subscribe({
      next: (response) => {
        this.isProcessingPayment.set(false);
        if (response.success && response.redirectUrl) {
          // Launch real PhonePe PG Hosted Gateway Page!
          window.location.href = response.redirectUrl;
        } else {
          this.paymentError.set(response.message || 'Payment initiation failed. Please try again.');
        }
      },
      error: (err) => {
        this.isProcessingPayment.set(false);
        console.error('PhonePe Payment Initiation Error:', err);
        this.paymentError.set(
          err.error?.message || 'Unable to connect to backend payment server. Please ensure JLITE.API backend is running on https://localhost:7001.'
        );
      }
    });
  }

  printReceipt() {
    window.print();
  }

  requestQuote(product: Product) {
    this.quoteService.requestQuote({
      productName: product.name,
      productPrice: product.price,
      productDetails: `${product.desc} | Specs: ${product.specs.join(', ')}`
    });
  }
}
