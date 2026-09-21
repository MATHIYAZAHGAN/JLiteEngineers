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

  isLoading = signal<boolean>(false);
  products = signal<Product[]>([]);
  categories = signal<string[]>([
    'All',
    'Chandeliers & Luxury',
    'Architectural Sconces',
    'Commercial & Office LED',
    'Outdoor & Heritage',
    'Industrial & Vintage'
  ]);
  activeCategory = signal('All');

  // Authentic 21-item Light Pitcher Luminaire Collection
  fallbackProducts: Product[] = [
    {
      id: 'lp-1',
      name: 'Modular 2x2 Troffer & Workstation Lighting System',
      price: 2199,
      unit: '/unit',
      tag: 'Commercial',
      tagColor: 'elec',
      type: 'commercial',
      categoryName: 'Commercial & Office LED',
      desc: 'Modular 600×600mm recessed parabolic louver troffer and perimeter circular cove luminaire system engineered for corporate open-plan workstation floors and IT facilities.',
      specs: ['36W / Troffer', '4000 Lumens', 'UGR<19 Anti-Glare', 'Recessed Grid'],
      img: 'assets/light pitcher/Picture13.jpg'
    },
    {
      id: 'lp-2',
      name: 'Ultra-Slim 2x2 LED Modular Ceiling Panel',
      price: 1699,
      unit: '/pc',
      tag: 'Best Seller',
      tagColor: 'gold',
      type: 'commercial',
      categoryName: 'Commercial & Office LED',
      desc: 'Ultra-thin edge-lit 600×600mm LED ceiling panel delivering uniform, low-glare 6500K daylight illumination for corporate IT offices and executive meeting suites.',
      specs: ['40W LED', '4400 Lumens', 'Flicker-Free Driver', 'IP44 Rated'],
      img: 'assets/light pitcher/Picture18.jpg'
    },
    {
      id: 'lp-3',
      name: 'Suspended Architectural Linear Luminaire 4ft',
      price: 2499,
      unit: '/pc',
      tag: 'Modern',
      tagColor: 'elec',
      type: 'commercial',
      categoryName: 'Commercial & Office LED',
      desc: 'Extruded anodized aluminium linear profile luminaire suspended with high-tensile steel aircraft cables for open-ceiling creative offices, studios, and workstation pods.',
      specs: ['36W Output', '1200mm Length', 'Aircraft Cable Mount', 'Continuous Throw'],
      img: 'assets/light pitcher/Picture22.jpg'
    },
    {
      id: 'lp-4',
      name: 'Executive Boardroom Linear Pendant System',
      price: 2999,
      unit: '/pc',
      tag: 'Executive',
      tagColor: 'gold',
      type: 'commercial',
      categoryName: 'Commercial & Office LED',
      desc: 'Sleek dual-throw suspended architectural linear fitting with direct task light and indirect ceiling wash, engineered for corporate conference halls and acoustic media rooms.',
      specs: ['45W High-Lumen', 'Direct / Indirect', 'CRI 92+ True Color', 'Matte Silver'],
      img: 'assets/light pitcher/Picture23.png'
    },
    {
      id: 'lp-5',
      name: 'Executive Cabin Luminaire & Pendant Suite',
      price: 3899,
      unit: '/set',
      tag: 'Curated Suite',
      tagColor: 'gold',
      type: 'commercial',
      categoryName: 'Commercial & Office LED',
      desc: 'Complete executive office lighting suite including suspended linear luminaire, frosted bell pendant accent, and perimeter glass sconces tailored for director cabins.',
      specs: ['Integrated Suite', 'Warm 3000K & Day', 'Triac Dimmable', 'Architectural'],
      img: 'assets/light pitcher/Picture24.jpg'
    },
    {
      id: 'lp-6',
      name: 'Architectural Vertical Wall-Grazer Sconce',
      price: 1899,
      unit: '/pc',
      tag: 'Architectural',
      tagColor: 'elec',
      type: 'sconce',
      categoryName: 'Architectural Sconces',
      desc: 'Vertical wall-mounted architectural grazing sconce casting refined upward and downward light cones along curved commercial corridors and textured glass partitions.',
      specs: ['16W Warm LED', 'Dual-Conic Beam', 'IP44 Rating', 'Die-Cast Alu'],
      img: 'assets/light pitcher/Picture25.jpg'
    },
    {
      id: 'lp-7',
      name: 'Tri-Cone Brushed Brass Architectural Sconce',
      price: 3550,
      unit: '/pc',
      tag: 'Model 2451-3',
      tagColor: 'gold',
      type: 'sconce',
      categoryName: 'Architectural Sconces',
      desc: 'Luxury 3-light vertical wall sconce with electroplated brushed brass central column and three sculptural conical frosted white glass diffusers. Model No. 2451-3.',
      specs: ['3 x 9W (27W)', 'Brushed Brass', 'Model 2451-3', 'Frosted Diffusers'],
      img: 'assets/light pitcher/1000006645.jpg'
    },
    {
      id: 'lp-8',
      name: 'Celestial Halo Brass & Opal Globe Sconce',
      price: 2750,
      unit: '/pc',
      tag: 'Model 516',
      tagColor: 'gold',
      type: 'sconce',
      categoryName: 'Architectural Sconces',
      desc: 'Minimalist circular wall sconce featuring a seamless 360° brushed brass halo ring encircling an illuminated hand-blown opal glass orb diffuser. Model No. 516.',
      specs: ['12W G9 LED', 'Brushed Gold Halo', 'Model 516', 'Hand-Blown Opal'],
      img: 'assets/light pitcher/1000006664.jpg'
    },
    {
      id: 'lp-9',
      name: 'LED Lum 4-Way Cross Beam Cube Sconce',
      price: 1599,
      unit: '/pc',
      tag: 'Cross Beam',
      tagColor: 'elec',
      type: 'sconce',
      categoryName: 'Architectural Sconces',
      desc: 'Heavy-duty matte black aluminium cube luminaire projecting 4 razor-sharp 90° cross beams (up, down, left, right) creating striking geometric patterns on feature walls.',
      specs: ['8W (4 x 2W)', 'IP65 Weatherproof', 'Die-Cast Body', 'Warm 3000K'],
      img: 'assets/light pitcher/1000006671.jpg'
    },
    {
      id: 'lp-10',
      name: 'Aerodynamic Teardrop Matte Black Sconce',
      price: 1899,
      unit: '/pc',
      tag: 'Sculptural',
      tagColor: 'gold',
      type: 'sconce',
      categoryName: 'Architectural Sconces',
      desc: 'Fluid aerodynamic teardrop architectural sconce in powder-coated matte black aluminium with sealed upper optical lens for hotel corridors, modern villas, and entryways.',
      specs: ['10W Cree LED', 'Sealed Top Optic', 'IP65 Rated', 'Corrosion-Proof'],
      img: 'assets/light pitcher/1000006674.jpg'
    },
    {
      id: 'lp-11',
      name: 'Heritage Hexagonal Matte Black Gate Lantern',
      price: 2199,
      unit: '/pc',
      tag: 'Heritage',
      tagColor: 'gold',
      type: 'outdoor',
      categoryName: 'Outdoor & Heritage',
      desc: 'Classic Victorian-inspired hexagonal outdoor wall lantern crafted from weather-resistant cast aluminium with bevelled frosted glass panels and antique crown finial.',
      specs: ['E27 Base (15W Max)', 'IP65 Waterproof', 'Cast Aluminium', 'Frosted Glass'],
      img: 'assets/light pitcher/1000006677.jpg'
    },
    {
      id: 'lp-12',
      name: '4-Lens Optical Convex Beam Cube Sconce',
      price: 1799,
      unit: '/pc',
      tag: 'Optical Convex',
      tagColor: 'elec',
      type: 'sconce',
      categoryName: 'Architectural Sconces',
      desc: 'Architectural cube luminaire fitted with 4 high-clarity convex bubble lenses that focus light into sharp, high-contrast curved beams on exterior and interior facade walls.',
      specs: ['12W High-Power', '4 Convex Lenses', 'IP65 Weatherproof', 'Charcoal Finish'],
      img: 'assets/light pitcher/1000006680.jpg'
    },
    {
      id: 'lp-13',
      name: 'Industrial Flared Mushroom Mesh Pendant',
      price: 1999,
      unit: '/pc',
      tag: 'Industrial',
      tagColor: 'gold',
      type: 'industrial',
      categoryName: 'Industrial & Vintage',
      desc: 'Vintage industrial flared canopy pendant luminaire featuring an internal expanded wire mesh protective cage inside a heavy borosilicate clear glass cylinder.',
      specs: ['15W E27 Fixture', 'Flared Metal Hood', 'Wire Mesh Core', 'Vintage Loft'],
      img: 'assets/light pitcher/1000006683.jpg'
    },
    {
      id: 'lp-14',
      name: 'Contemporary Arched Exterior Garden Sconce',
      price: 1699,
      unit: '/pc',
      tag: 'IP65 Outdoor',
      tagColor: 'elec',
      type: 'outdoor',
      categoryName: 'Outdoor & Heritage',
      desc: 'Modern outdoor luminaire featuring a downward-sloping arched matte black canopy and wide trapezoidal frosted diffuser providing uniform, anti-glare pathway illumination.',
      specs: ['12W Integrated LED', 'IP65 Dust & Water', 'IK08 Impact Rated', 'UV-Stabilized'],
      img: 'assets/light pitcher/1000006686.jpg'
    },
    {
      id: 'lp-15',
      name: 'Modern Rectangular Glass Carriage Box Lantern',
      price: 2499,
      unit: '/pc',
      tag: 'Trending',
      tagColor: 'gold',
      type: 'outdoor',
      categoryName: 'Outdoor & Heritage',
      desc: 'Minimalist rectangular carriage wall lantern with matte black architectural frame and 4 crystal-clear tempered glass panes showcasing an exposed warm Edison filament bulb.',
      specs: ['E27 Vintage Edison', 'Clear Tempered Glass', 'IP65 Weatherproof', 'Architectural'],
      img: 'assets/light pitcher/1000006689.jpg'
    },
    {
      id: 'lp-16',
      name: 'Grand Prismatic Crystal Halo Chandelier 600mm',
      price: 12999,
      unit: '/pc',
      tag: 'Grand Luxury',
      tagColor: 'gold',
      type: 'chandelier',
      categoryName: 'Chandeliers & Luxury',
      desc: 'Masterpiece circular ring chandelier surrounded by precision-cut radial K9 faceted crystal prisms housed within a brushed champagne gold brass chassis.',
      specs: ['48W Tri-Color LED', '600mm Diameter', 'K9 Prismatic Crystal', 'Aircraft Wire Mount'],
      img: 'assets/light pitcher/1000006692.jpg'
    },
    {
      id: 'lp-17',
      name: 'Imperial Radial Crystal Ring Pendant 800mm',
      price: 16499,
      unit: '/pc',
      tag: 'Masterpiece',
      tagColor: 'gold',
      type: 'chandelier',
      categoryName: 'Chandeliers & Luxury',
      desc: 'Grand 800mm diameter statement crystal ring luminaire. Heavy faceted crystal baguettes refract light into spectacular diamond prismatic sparkles across luxury reception halls.',
      specs: ['65W High-Output', '800mm Diameter', 'Faceted Crystal Prisms', 'Satin Brass Rim'],
      img: 'assets/light pitcher/1000006695.jpg'
    },
    {
      id: 'lp-18',
      name: 'Crown Jewel Tiered Crystal Chandelier',
      price: 14899,
      unit: '/pc',
      tag: 'VIP Edition',
      tagColor: 'gold',
      type: 'chandelier',
      categoryName: 'Chandeliers & Luxury',
      desc: 'Luxury multi-tier architectural crystal chandelier with gold suspension ring and cascading optical crystal prisms designed for high-ceiling entrance foyers and VIP lounges.',
      specs: ['55W Dimmable LED', 'Cascading Crystals', 'Champagne Gold', 'Warm 2700K'],
      img: 'assets/light pitcher/1000006698.jpg'
    },
    {
      id: 'lp-19',
      name: 'Dandelion Crystal Flower Sputnik Chandelier',
      price: 13999,
      unit: '/pc',
      tag: 'Bestseller Luxury',
      tagColor: 'gold',
      type: 'chandelier',
      categoryName: 'Chandeliers & Luxury',
      desc: 'Exquisite dandelion sputnik chandelier featuring radiant brushed brass starburst spokes tipped with multifaceted crystal flower petals scattering diamond light throughout the room.',
      specs: ['8 x G9 / 40W', 'Multifaceted Petals', 'Solid Brass Core', '500mm Diameter'],
      img: 'assets/light pitcher/1000006701.jpg'
    },
    {
      id: 'lp-20',
      name: 'Starburst Crystal Blossom Sphere Luminaire',
      price: 15299,
      unit: '/pc',
      tag: 'Designer Choice',
      tagColor: 'gold',
      type: 'chandelier',
      categoryName: 'Chandeliers & Luxury',
      desc: 'Spherical crystal floral luminaire composed of hand-assembled K9 crystal blossoms radiating outward from a golden brass hub, creating a floating starlight effect.',
      specs: ['45W LED Array', '550mm Full Sphere', 'K9 Floral Petals', 'Adjustable Stem'],
      img: 'assets/light pitcher/1000006704.jpg'
    },
    {
      id: 'lp-21',
      name: 'Celestial Crystal Flora Chandelier 650mm',
      price: 17999,
      unit: '/pc',
      tag: 'Crest Collection',
      tagColor: 'gold',
      type: 'chandelier',
      categoryName: 'Chandeliers & Luxury',
      desc: 'Grand 650mm statement chandelier with golden acoustic disc reflectors and dense concentric arrays of high-refraction crystal flowers. Engineered for executive banquet suites and penthouses.',
      specs: ['60W Tri-Tone CCT', '650mm Diameter', 'Champagne Brass', 'Remote Dimmable'],
      img: 'assets/light pitcher/1000006707.jpg'
    }
  ];

  ngOnInit(): void {
    this.fetchCatalog();
  }

  fetchCatalog(): void {
    // Populate with authentic Light Pitcher collection immediately
    this.products.set(this.fallbackProducts);

    // If backend has products, only accept items with valid light pitcher imagery,
    // explicitly rejecting any outdated dummy assets (Picture1..8, etc.)
    this.http.get<Product[]>(`${environment.apiUrl}/products`).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          const validLightingProducts = data
            .filter(p => (p.imageUrl || p.img || '').includes('light pitcher'))
            .map(p => ({
              ...p,
              img: p.imageUrl || p.img,
              desc: p.description || p.desc || ''
            }));

          if (validLightingProducts.length > 0) {
            this.products.set(validLightingProducts);
          }
        }
      },
      error: () => {
        // Retain fallbackProducts
      }
    });
  }

  filteredProducts = computed(() => {
    const cat = this.activeCategory();
    const list = this.products();
    if (cat === 'All') return list;
    return list.filter(p => p.categoryName === cat || p.type === cat);
  });

  setCategory(cat: string) {
    this.activeCategory.set(cat);
  }

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
