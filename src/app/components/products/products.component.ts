import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

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
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './products.component.html',
})
export class ProductsComponent {
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
      img: 'assets/Picture3.jpg', imgBg: '#F8FAFC',
    },
    {
      id: 4, name: 'DB Box 8-Way', price: 5499, unit: '/pc',
      tag: 'New', tagColor: 'green', type: 'db',
      desc: 'Surface-mount distribution board, 8-way, with transparent door.',
      specs: ['8-Way', 'IP40', 'DIN Rail'],
      img: 'assets/Picture4.jpg', imgBg: '#F1F5F9',
    },
    {
      id: 5, name: 'RCCB 63A 30mA', price: 3499, unit: '/pc',
      tag: null, tagColor: null, type: 'rccb',
      desc: 'Residual current circuit breaker for earth leakage protection.',
      specs: ['63A', '30mA', 'IEC 61008'],
      img: 'assets/Picture5.jpg', imgBg: '#EFF6FF',
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
      img: 'assets/Picture29.jpg', imgBg: '#F8FAFC',
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

  cartCount = computed(() => this.cart().reduce((s, i) => s + i.qty, 0));
  cartTotal = computed(() => this.cart().reduce((s, i) => s + i.price * i.qty, 0));

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
}
