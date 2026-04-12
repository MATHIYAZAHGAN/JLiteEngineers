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
    { id: 'all',        label: 'All Lighting' },
    { id: 'panel',      label: 'LED Panels' },
    { id: 'batten',     label: 'Battens & Tubes' },
    { id: 'highbay',    label: 'High Bay' },
    { id: 'outdoor',    label: 'Outdoor' },
    { id: 'decorative', label: 'Decorative' },
  ];

  products: LightProduct[] = [
    {
      id: 1, name: 'Slim LED Panel 18W', category: 'panel',
      wattage: '18W', lumens: '1800lm', ip: 'IP44', cct: '4000K',
      desc: 'Ultra-slim recessed LED panel, CCT tunable 3000K–6500K. Ideal for offices, hospitals, and commercial spaces.',
      img: 'assets/light pitcher/Picture13.jpg', tag: 'Best Seller', tagColor: 'blue', badge: 'Commercial',
    },
    {
      id: 2, name: 'LED Batten 40W 4ft', category: 'batten',
      wattage: '40W', lumens: '4000lm', ip: 'IP65', cct: '6500K',
      desc: 'Surface-mount LED batten fitting for industrial and warehouse applications. Waterproof IP65 rated.',
      img: 'assets/light pitcher/Picture18.jpg', tag: 'Industrial', tagColor: 'gold', badge: 'Industrial',
    },
    {
      id: 3, name: 'High Bay LED 100W', category: 'highbay',
      wattage: '100W', lumens: '12000lm', ip: 'IP65', cct: '5000K',
      desc: 'UFO high bay LED for warehouses, factories, and large halls. 120° beam angle with die-cast aluminium housing.',
      img: 'assets/light pitcher/Picture22.jpg', tag: 'New', tagColor: 'green', badge: 'Industrial',
    },
    {
      id: 4, name: 'Flood Light 150W', category: 'outdoor',
      wattage: '150W', lumens: '18000lm', ip: 'IP67', cct: '6000K',
      desc: 'High-power LED flood light for stadiums, parking lots, and building facades. Wide beam 120°.',
      img: 'assets/light pitcher/Picture23.png', tag: null, tagColor: '', badge: 'Outdoor',
    },
    {
      id: 5, name: 'Decorative Pendant 12W', category: 'decorative',
      wattage: '12W', lumens: '900lm', ip: 'IP20', cct: '3000K',
      desc: 'Designer pendant light for hotels, restaurants, and premium residential spaces. Warm white ambience.',
      img: 'assets/light pitcher/Picture24.jpg', tag: 'Premium', tagColor: 'gold', badge: 'Decorative',
    },
    {
      id: 6, name: 'Recessed Downlight 9W', category: 'panel',
      wattage: '9W', lumens: '800lm', ip: 'IP44', cct: '3000K',
      desc: 'Compact recessed downlight for residential and hospitality interiors. Dimmable, anti-glare design.',
      img: 'assets/light pitcher/Picture25.jpg', tag: 'Popular', tagColor: 'blue', badge: 'Residential',
    },
    {
      id: 7, name: 'LED Spotlight 12W', category: 'panel',
      wattage: '12W', lumens: '1100lm', ip: 'IP44', cct: '3000K',
      desc: 'Adjustable LED spotlight for accent and track lighting in retail and hospitality environments.',
      img: 'assets/light pitcher/1000006645.jpg', tag: null, tagColor: '', badge: 'Commercial',
    },
    {
      id: 8, name: 'Linear LED 60W', category: 'batten',
      wattage: '60W', lumens: '6600lm', ip: 'IP40', cct: '4000K',
      desc: 'Linkable linear LED luminaire for retail, showrooms, and office corridors. Clean architectural look.',
      img: 'assets/light pitcher/1000006664.jpg', tag: null, tagColor: '', badge: 'Commercial',
    },
    {
      id: 9, name: 'High Bay 200W UFO', category: 'highbay',
      wattage: '200W', lumens: '24000lm', ip: 'IP65', cct: '5000K',
      desc: 'Heavy-duty UFO high bay for large industrial facilities. Integrated driver, 50,000hr lifespan.',
      img: 'assets/light pitcher/1000006671.jpg', tag: 'Heavy Duty', tagColor: 'gold', badge: 'Industrial',
    },
    {
      id: 10, name: 'Outdoor Wall Light 20W', category: 'outdoor',
      wattage: '20W', lumens: '2000lm', ip: 'IP65', cct: '4000K',
      desc: 'Architectural outdoor wall luminaire for building facades, pathways, and entrance areas.',
      img: 'assets/light pitcher/1000006674.jpg', tag: null, tagColor: '', badge: 'Outdoor',
    },
    {
      id: 11, name: 'Chandelier LED 36W', category: 'decorative',
      wattage: '36W', lumens: '3200lm', ip: 'IP20', cct: '2700K',
      desc: 'Elegant LED chandelier for lobbies, banquet halls, and premium residential spaces.',
      img: 'assets/light pitcher/1000006677.jpg', tag: 'Premium', tagColor: 'gold', badge: 'Decorative',
    },
    {
      id: 12, name: 'Tube Light 20W T8', category: 'batten',
      wattage: '20W', lumens: '2200lm', ip: 'IP20', cct: '6500K',
      desc: 'Direct replacement T8 LED tube for fluorescent fittings. Instant start, flicker-free operation.',
      img: 'assets/light pitcher/1000006680.jpg', tag: null, tagColor: '', badge: 'Commercial',
    },
    {
      id: 13, name: 'Garden Spike Light 10W', category: 'outdoor',
      wattage: '10W', lumens: '900lm', ip: 'IP67', cct: '3000K',
      desc: 'Ground spike LED spotlight for garden landscaping, tree uplighting, and pathway marking.',
      img: 'assets/light pitcher/1000006683.jpg', tag: null, tagColor: '', badge: 'Outdoor',
    },
    {
      id: 14, name: 'Panel Light 36W 600x600', category: 'panel',
      wattage: '36W', lumens: '3600lm', ip: 'IP40', cct: '4000K',
      desc: 'Standard 600×600 recessed LED panel for suspended ceilings in offices and commercial buildings.',
      img: 'assets/light pitcher/1000006686.jpg', tag: null, tagColor: '', badge: 'Commercial',
    },
    {
      id: 15, name: 'High Bay 150W Linear', category: 'highbay',
      wattage: '150W', lumens: '18000lm', ip: 'IP65', cct: '5700K',
      desc: 'Linear high bay LED for production floors, cold storage, and large retail spaces.',
      img: 'assets/light pitcher/1000006689.jpg', tag: null, tagColor: '', badge: 'Industrial',
    },
    {
      id: 16, name: 'Bollard Light 15W', category: 'outdoor',
      wattage: '15W', lumens: '1400lm', ip: 'IP65', cct: '4000K',
      desc: 'Stainless steel LED bollard for driveways, parks, and pedestrian pathways.',
      img: 'assets/light pitcher/1000006692.jpg', tag: null, tagColor: '', badge: 'Outdoor',
    },
    {
      id: 17, name: 'Cove Light Strip 14W/m', category: 'decorative',
      wattage: '14W/m', lumens: '1400lm/m', ip: 'IP20', cct: '3000K',
      desc: 'Flexible LED cove lighting strip for indirect architectural illumination in hotels and malls.',
      img: 'assets/light pitcher/1000006695.jpg', tag: 'New', tagColor: 'green', badge: 'Decorative',
    },
    {
      id: 18, name: 'Batten Fitting 36W 4ft', category: 'batten',
      wattage: '36W', lumens: '3800lm', ip: 'IP65', cct: '6500K',
      desc: 'Weatherproof LED batten for car parks, stairwells, and outdoor covered areas.',
      img: 'assets/light pitcher/1000006698.jpg', tag: null, tagColor: '', badge: 'Industrial',
    },
    {
      id: 19, name: 'Track Light 25W', category: 'panel',
      wattage: '25W', lumens: '2500lm', ip: 'IP20', cct: '3000K',
      desc: 'Adjustable LED track spotlight for retail display, gallery, and showroom accent lighting.',
      img: 'assets/light pitcher/1000006701.jpg', tag: 'Popular', tagColor: 'blue', badge: 'Commercial',
    },
    {
      id: 20, name: 'Canopy Light 50W', category: 'outdoor',
      wattage: '50W', lumens: '6000lm', ip: 'IP66', cct: '5000K',
      desc: 'Recessed LED canopy light for petrol stations, car parks, and covered walkways.',
      img: 'assets/light pitcher/1000006704.jpg', tag: null, tagColor: '', badge: 'Outdoor',
    },
    {
      id: 21, name: 'Pendant Cluster 48W', category: 'decorative',
      wattage: '48W', lumens: '4200lm', ip: 'IP20', cct: '2700K',
      desc: 'Multi-head LED pendant cluster for dining areas, reception lobbies, and feature ceilings.',
      img: 'assets/light pitcher/1000006707.jpg', tag: 'Premium', tagColor: 'gold', badge: 'Decorative',
    },
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
