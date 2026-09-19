import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { CartService, Product as GlobalProduct } from '../../services/cart.service';
import { environment } from '../../../environments/environment';

export interface Product {
  id: string | number;
  name: string;
  price: number;
  unit: string;
  tag: string | null;
  tagColor: string | null;
  type: string;
  desc: string;
  description?: string;
  specs: string[];
  img: string;
  imageUrl?: string;
  imgBg?: string;
  categoryName?: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  private http = inject(HttpClient);
  cartService = inject(CartService);

  isLoading = signal<boolean>(true);
  products = signal<Product[]>([]);
  categories = signal<string[]>(['All', 'Switchgear & MCBs', 'Smart Switches', 'LED & Architectural Lighting', 'Cables & Wiring', 'Surge & Power Protection']);
  activeCategory = signal('All');

  fallbackProducts: Product[] = [
    {
      id: '1', name: 'JJ MCB 32A Double Pole', price: 1499, unit: '/pc',
      tag: 'Best Seller', tagColor: 'elec', type: 'mcb', categoryName: 'Switchgear & MCBs',
      desc: 'Double-pole miniature circuit breaker, 6kA breaking capacity.',
      specs: ['32A', '6kA', 'IEC 60898'], img: 'assets/Picture1.jpg'
    },
    {
      id: '2', name: 'Smart LED Panel 18W Tunable CCT', price: 1999, unit: '/pc',
      tag: 'New', tagColor: 'green', type: 'led', categoryName: 'LED & Architectural Lighting',
      desc: 'Slim recessed LED panel, CCT tunable 3000K–6500K, Wi-Fi ready.',
      specs: ['18W', '1800lm', 'IP44'], img: 'assets/Picture2.jpg'
    },
    {
      id: '3', name: 'JJ Smart Touch Switch 4-Gang', price: 2699, unit: '/pc',
      tag: 'B2B Choice', tagColor: 'blue', type: 'switch', categoryName: 'Smart Switches',
      desc: 'Touch-capacitive smart switch with Wi-Fi, works with Alexa & Google.',
      specs: ['10A', '2.4GHz', 'Zigbee'], img: 'assets/work/Picture3.jpg'
    },
    {
      id: '4', name: 'Distribution Board 8-Way Double Door', price: 5499, unit: '/pc',
      tag: 'Heavy Duty', tagColor: 'slate', type: 'db', categoryName: 'Switchgear & MCBs',
      desc: 'Surface-mount distribution board, 8-way, with transparent door.',
      specs: ['8-Way', 'IP40', 'DIN Rail'], img: 'assets/work/Picture4.jpg'
    },
    {
      id: '5', name: 'RCCB 63A 30mA 4-Pole', price: 3499, unit: '/pc',
      tag: 'Safety First', tagColor: 'red', type: 'rccb', categoryName: 'Switchgear & MCBs',
      desc: 'Residual current circuit breaker for earth leakage protection.',
      specs: ['63A', '30mA', 'IEC 61008'], img: 'assets/work/Picture5.jpg'
    },
    {
      id: '6', name: 'Armoured Power Cable 4-Core 4mm² SWA', price: 699, unit: '/m',
      tag: 'Best Seller', tagColor: 'elec', type: 'cable', categoryName: 'Cables & Wiring',
      desc: '4-core SWA armoured cable for underground and sub-station feeder use.',
      specs: ['4×4mm²', '0.6/1kV', 'BS5467'], img: 'assets/Picture6.jpg'
    }
  ];

  ngOnInit(): void {
    this.fetchCatalog();
  }

  fetchCatalog(): void {
    this.isLoading.set(true);
    this.http.get<Product[]>(`${environment.apiUrl}/products`).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          const mapped = data.map(p => ({
            ...p,
            img: p.imageUrl || p.img || 'assets/Picture1.jpg',
            desc: p.description || p.desc || ''
          }));
          this.products.set(mapped);
        } else {
          this.products.set(this.fallbackProducts);
        }
        this.isLoading.set(false);
      },
      error: () => {
        this.products.set(this.fallbackProducts);
        this.isLoading.set(false);
      }
    });
  }

  filteredProducts = computed(() => {
    const cat = this.activeCategory();
    const list = this.products();
    if (cat === 'All') return list;
    return list.filter(p => p.categoryName === cat || p.type === cat);
  });

  setCategory(cat: string) { this.activeCategory.set(cat); }

  addToCart(product: Product) {
    const globalItem: GlobalProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      tag: product.tag,
      tagColor: product.tagColor,
      type: product.type,
      desc: product.desc,
      specs: product.specs,
      img: product.img
    };
    this.cartService.addToCart(globalItem, 1);
  }
}
