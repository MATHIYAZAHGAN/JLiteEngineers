import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

export interface LightProduct {
  id: number;
  name: string;
  category: string;
  wattage: string;
  lumens: string;
  ip: string;
  cct: string;
  desc: string;
  img: string;
  tag: string | null;
  tagColor: string;
  badge: string;
}

@Component({
  selector: 'app-light-pitcher',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './light-pitcher.component.html',
})
export class LightPitcherComponent {

  activeCategory = signal('all');
  lightboxImg = signal<string | null>(null);
  lightboxTitle = signal<string>('');

  categories = [
    { id: 'all',         label: 'All Luminaires' },
    { id: 'chandelier',  label: 'Chandeliers & Luxury' },
    { id: 'sconce',      label: 'Architectural Sconces' },
    { id: 'commercial',  label: 'Commercial & Office LED' },
    { id: 'outdoor',     label: 'Outdoor & Heritage' },
    { id: 'industrial',  label: 'Industrial & Vintage' },
  ];

  products: LightProduct[] = [
    {
      id: 1,
      name: 'Modular 2x2 Troffer & Workstation Lighting System',
      category: 'commercial',
      wattage: '36W',
      lumens: '4000lm',
      ip: 'IP40',
      cct: '5000K',
      desc: 'Modular 600×600mm recessed parabolic louver troffer and perimeter circular cove luminaire system engineered for corporate open-plan workstation floors.',
      img: 'assets/light pitcher/Picture13.jpg',
      tag: 'Commercial',
      tagColor: 'blue',
      badge: 'Office'
    },
    {
      id: 2,
      name: 'Ultra-Slim 2x2 LED Modular Ceiling Panel',
      category: 'commercial',
      wattage: '40W',
      lumens: '4400lm',
      ip: 'IP44',
      cct: '6500K',
      desc: 'Surface-flush edge-lit 600×600mm LED ceiling panel delivering uniform, low-glare daylight white illumination for corporate IT suites and meeting rooms.',
      img: 'assets/light pitcher/Picture18.jpg',
      tag: 'Best Seller',
      tagColor: 'gold',
      badge: 'Commercial'
    },
    {
      id: 3,
      name: 'Suspended Architectural Linear Luminaire 4ft',
      category: 'commercial',
      wattage: '36W',
      lumens: '3960lm',
      ip: 'IP40',
      cct: '4000K',
      desc: 'Extruded anodized aluminium linear profile luminaire suspended with high-tensile steel aircraft cables for open-ceiling creative offices and studios.',
      img: 'assets/light pitcher/Picture22.jpg',
      tag: 'Modern',
      tagColor: 'blue',
      badge: 'Architectural'
    },
    {
      id: 4,
      name: 'Executive Boardroom Linear Pendant System',
      category: 'commercial',
      wattage: '45W',
      lumens: '4950lm',
      ip: 'IP40',
      cct: '4000K',
      desc: 'Sleek dual-throw suspended architectural linear fitting with direct task light and indirect ceiling wash, engineered for corporate conference halls.',
      img: 'assets/light pitcher/Picture23.png',
      tag: 'Executive',
      tagColor: 'gold',
      badge: 'Boardroom'
    },
    {
      id: 5,
      name: 'Executive Cabin Luminaire & Pendant Suite',
      category: 'commercial',
      wattage: '32W',
      lumens: '3500lm',
      ip: 'IP20',
      cct: '3000K',
      desc: 'Complete executive office lighting suite including suspended linear luminaire, frosted bell pendant accent, and perimeter glass sconces.',
      img: 'assets/light pitcher/Picture24.jpg',
      tag: 'Curated Suite',
      tagColor: 'gold',
      badge: 'Executive'
    },
    {
      id: 6,
      name: 'Architectural Vertical Wall-Grazer Sconce',
      category: 'sconce',
      wattage: '16W',
      lumens: '1600lm',
      ip: 'IP44',
      cct: '3000K',
      desc: 'Vertical wall-mounted architectural grazing sconce casting refined upward and downward light cones along curved commercial corridors and glass partitions.',
      img: 'assets/light pitcher/Picture25.jpg',
      tag: 'Architectural',
      tagColor: 'blue',
      badge: 'Corridor'
    },
    {
      id: 7,
      name: 'Tri-Cone Brushed Brass Architectural Sconce',
      category: 'sconce',
      wattage: '27W',
      lumens: '2400lm',
      ip: 'IP20',
      cct: '2700K',
      desc: 'Luxury 3-light vertical wall sconce with electroplated brushed brass central column and three sculptural conical frosted white glass diffusers. Model No. 2451-3.',
      img: 'assets/light pitcher/1000006645.jpg',
      tag: 'Model 2451-3',
      tagColor: 'gold',
      badge: 'Luxury Sconce'
    },
    {
      id: 8,
      name: 'Celestial Halo Brass & Opal Globe Sconce',
      category: 'sconce',
      wattage: '12W',
      lumens: '1100lm',
      ip: 'IP20',
      cct: '3000K',
      desc: 'Minimalist circular wall sconce featuring a seamless 360° brushed brass halo ring encircling an illuminated hand-blown opal glass orb diffuser. Model No. 516.',
      img: 'assets/light pitcher/1000006664.jpg',
      tag: 'Model 516',
      tagColor: 'gold',
      badge: 'Halo Sconce'
    },
    {
      id: 9,
      name: 'LED Lum 4-Way Cross Beam Cube Sconce',
      category: 'sconce',
      wattage: '8W',
      lumens: '800lm',
      ip: 'IP65',
      cct: '3000K',
      desc: 'Heavy-duty matte black aluminium cube luminaire projecting 4 razor-sharp 90° cross beams (up, down, left, right) creating striking geometric wall patterns.',
      img: 'assets/light pitcher/1000006671.jpg',
      tag: 'Cross Beam',
      tagColor: 'blue',
      badge: 'Facade'
    },
    {
      id: 10,
      name: 'Aerodynamic Teardrop Matte Black Sconce',
      category: 'sconce',
      wattage: '10W',
      lumens: '950lm',
      ip: 'IP65',
      cct: '3000K',
      desc: 'Fluid aerodynamic teardrop architectural sconce in powder-coated matte black aluminium with sealed upper optical lens for hotel corridors and villas.',
      img: 'assets/light pitcher/1000006674.jpg',
      tag: 'Sculptural',
      tagColor: 'gold',
      badge: 'Outdoor'
    },
    {
      id: 11,
      name: 'Heritage Hexagonal Matte Black Gate Lantern',
      category: 'outdoor',
      wattage: '15W',
      lumens: '1350lm',
      ip: 'IP65',
      cct: '2700K',
      desc: 'Classic Victorian-inspired hexagonal outdoor wall lantern crafted from weather-resistant cast aluminium with bevelled frosted glass panels.',
      img: 'assets/light pitcher/1000006677.jpg',
      tag: 'Heritage',
      tagColor: 'gold',
      badge: 'Gate Lantern'
    },
    {
      id: 12,
      name: '4-Lens Optical Convex Beam Cube Sconce',
      category: 'sconce',
      wattage: '12W',
      lumens: '1200lm',
      ip: 'IP65',
      cct: '3000K',
      desc: 'Architectural cube luminaire fitted with 4 high-clarity convex bubble lenses that focus light into sharp, high-contrast curved beams on exterior walls.',
      img: 'assets/light pitcher/1000006680.jpg',
      tag: 'Optical Convex',
      tagColor: 'blue',
      badge: 'Optical'
    },
    {
      id: 13,
      name: 'Industrial Flared Mushroom Mesh Pendant',
      category: 'industrial',
      wattage: '15W',
      lumens: '1400lm',
      ip: 'IP20',
      cct: '2700K',
      desc: 'Vintage industrial flared canopy pendant luminaire featuring an internal expanded wire mesh protective cage inside a heavy borosilicate clear glass cylinder.',
      img: 'assets/light pitcher/1000006683.jpg',
      tag: 'Industrial',
      tagColor: 'gold',
      badge: 'Vintage'
    },
    {
      id: 14,
      name: 'Contemporary Arched Exterior Garden Sconce',
      category: 'outdoor',
      wattage: '12W',
      lumens: '1100lm',
      ip: 'IP65',
      cct: '3000K',
      desc: 'Modern outdoor luminaire featuring a downward-sloping arched matte black canopy and wide trapezoidal frosted diffuser providing uniform pathway illumination.',
      img: 'assets/light pitcher/1000006686.jpg',
      tag: 'IP65 Outdoor',
      tagColor: 'blue',
      badge: 'Garden'
    },
    {
      id: 15,
      name: 'Modern Rectangular Glass Carriage Box Lantern',
      category: 'outdoor',
      wattage: '10W',
      lumens: '850lm',
      ip: 'IP65',
      cct: '2200K',
      desc: 'Minimalist rectangular carriage wall lantern with matte black architectural frame and 4 crystal-clear tempered glass panes showcasing an exposed warm Edison bulb.',
      img: 'assets/light pitcher/1000006689.jpg',
      tag: 'Trending',
      tagColor: 'gold',
      badge: 'Carriage'
    },
    {
      id: 16,
      name: 'Grand Prismatic Crystal Halo Chandelier 600mm',
      category: 'chandelier',
      wattage: '48W',
      lumens: '4800lm',
      ip: 'IP20',
      cct: '3-Tone CCT',
      desc: 'Masterpiece circular ring chandelier surrounded by precision-cut radial K9 faceted crystal prisms housed within a brushed champagne gold brass chassis.',
      img: 'assets/light pitcher/1000006692.jpg',
      tag: 'Grand Luxury',
      tagColor: 'gold',
      badge: 'Chandelier'
    },
    {
      id: 17,
      name: 'Imperial Radial Crystal Ring Pendant 800mm',
      category: 'chandelier',
      wattage: '65W',
      lumens: '6500lm',
      ip: 'IP20',
      cct: '3-Tone CCT',
      desc: 'Grand 800mm diameter statement crystal ring luminaire. Heavy faceted crystal baguettes refract light into spectacular diamond prismatic sparkles.',
      img: 'assets/light pitcher/1000006695.jpg',
      tag: 'Masterpiece',
      tagColor: 'gold',
      badge: 'Ring Chandelier'
    },
    {
      id: 18,
      name: 'Crown Jewel Tiered Crystal Chandelier',
      category: 'chandelier',
      wattage: '55W',
      lumens: '5500lm',
      ip: 'IP20',
      cct: '2700K',
      desc: 'Luxury multi-tier architectural crystal chandelier with gold suspension ring and cascading optical crystal prisms designed for high-ceiling entrance foyers.',
      img: 'assets/light pitcher/1000006698.jpg',
      tag: 'VIP Edition',
      tagColor: 'gold',
      badge: 'Foyer'
    },
    {
      id: 19,
      name: 'Dandelion Crystal Flower Sputnik Chandelier',
      category: 'chandelier',
      wattage: '40W',
      lumens: '4000lm',
      ip: 'IP20',
      cct: '3000K',
      desc: 'Exquisite dandelion sputnik chandelier featuring radiant brushed brass starburst spokes tipped with multifaceted crystal flower petals scattering diamond light.',
      img: 'assets/light pitcher/1000006701.jpg',
      tag: 'Bestseller Luxury',
      tagColor: 'gold',
      badge: 'Sputnik'
    },
    {
      id: 20,
      name: 'Starburst Crystal Blossom Sphere Luminaire',
      category: 'chandelier',
      wattage: '45W',
      lumens: '4500lm',
      ip: 'IP20',
      cct: '3000K',
      desc: 'Spherical crystal floral luminaire composed of hand-assembled K9 crystal blossoms radiating outward from a golden brass hub, creating a floating starlight effect.',
      img: 'assets/light pitcher/1000006704.jpg',
      tag: 'Designer Choice',
      tagColor: 'gold',
      badge: 'Blossom'
    },
    {
      id: 21,
      name: 'Celestial Crystal Flora Chandelier 650mm',
      category: 'chandelier',
      wattage: '60W',
      lumens: '6000lm',
      ip: 'IP20',
      cct: '3-Tone CCT',
      desc: 'Grand 650mm statement chandelier with golden acoustic disc reflectors and dense concentric arrays of high-refraction crystal flowers. Engineered for luxury suites.',
      img: 'assets/light pitcher/1000006707.jpg',
      tag: 'Crest Collection',
      tagColor: 'gold',
      badge: 'Grand Suite'
    }
  ];

  get filtered() {
    const cat = this.activeCategory();
    return cat === 'all' ? this.products : this.products.filter(p => p.category === cat);
  }

  setCategory(id: string) { this.activeCategory.set(id); }

  openLightbox(img: string, title: string) {
    this.lightboxImg.set(img);
    this.lightboxTitle.set(title);
  }

  closeLightbox() { this.lightboxImg.set(null); }

  tagBg(color: string): string {
    const map: Record<string, string> = {
      blue: 'var(--blue-light)', gold: 'var(--gold-light)', green: 'var(--green-light)',
    };
    return map[color] || 'var(--ivory-2)';
  }

  tagColor(color: string): string {
    const map: Record<string, string> = {
      blue: 'var(--blue)', gold: 'var(--gold)', green: 'var(--green)',
    };
    return map[color] || 'var(--slate)';
  }
}
