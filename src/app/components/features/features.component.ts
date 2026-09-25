import { Component, ElementRef, ViewChild, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

export interface WorkPhoto {
  img: string;
  title: string;
  tag: string;
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './features.component.html',
})
export class FeaturesComponent {
  @ViewChild('carousel', { static: false }) carouselRef?: ElementRef<HTMLDivElement>;

  lightboxImg = signal<string | null>(null);
  lightboxTitle = signal<string>('');

  features = [
    { icon: 'certified', title: 'ISI & CE Certified', desc: 'Every product meets international safety standards — ISI, CE, RoHS, and IEC certified for residential and industrial use.' },
    { icon: 'smart', title: 'Smart Ready', desc: 'Wi-Fi and Zigbee-enabled switches and panels compatible with Alexa, Google Home, and custom BMS systems.' },
    { icon: 'warranty', title: '5-Year Warranty', desc: 'Industry-leading warranty on all switchgear, MCBs, and wiring accessories. Zero-hassle replacement guarantee.' },
    { icon: 'delivery', title: 'Fast B2B Supply', desc: 'Bulk orders dispatched within 24 hours. Dedicated account managers for contractors and project teams.' },
  ];

  trustItems = [
    'ISO 9001 Certified',
    'IEC 60898 Compliant',
    'RoHS Approved',
    '50,000+ Happy Clients',
    '40+ Countries Served',
    '24h Order Dispatch',
  ];

  workPhotos: WorkPhoto[] = [
    { img: 'assets/work/Picture37.jpg', title: 'Modular Workstation Troffer Lighting', tag: 'Commercial Lighting' },
    { img: 'assets/work/Picture38.jpg', title: 'Conference Hall Architectural Lighting', tag: 'Corporate Fitout' },
    { img: 'assets/work/Picture42.jpg', title: 'Solar PV Module Installation & Array', tag: 'Solar Engineering' },
    { img: 'assets/work/Picture43.jpg', title: 'Solar Inverter & High-Voltage Termination', tag: 'Power Systems' },
    { img: 'assets/work/Picture3.jpg',  title: '33KV HT Substation & Transformer Setup', tag: 'A-Grade Contracting' },
    { img: 'assets/work/Picture4.jpg',  title: 'Heavy-Duty Industrial Panel Suite', tag: 'Switchgear & Panels' },
    { img: 'assets/work/Picture5.jpg',  title: 'Main LT Distribution Busbar Chamber', tag: 'Power Distribution' },
    { img: 'assets/work/Picture33.jpg', title: 'Corporate Interior Conduit & Wiring', tag: 'Electrical Wiring' },
    { img: 'assets/work/Picture34.jpg', title: 'Manufacturing Plant Floor Power Grid', tag: 'Industrial Automation' },
    { img: 'assets/work/Picture41.png', title: 'Solar Rooftop Grid-Tie Installation', tag: 'Renewable EPC' }
  ];

  scrollLeft(): void {
    if (this.carouselRef?.nativeElement) {
      const container = this.carouselRef.nativeElement;
      const scrollAmount = Math.max(280, container.clientWidth * 0.7);
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  }

  scrollRight(): void {
    if (this.carouselRef?.nativeElement) {
      const container = this.carouselRef.nativeElement;
      const scrollAmount = Math.max(280, container.clientWidth * 0.7);
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  @HostListener('window:keydown.escape')
  onEscapeKey(): void {
    if (this.lightboxImg()) {
      this.closeLightbox();
    }
  }

  openLightbox(img: string, title: string, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.lightboxImg.set(img);
    this.lightboxTitle.set(title);
    if (typeof document !== 'undefined') {
      document.body.classList.add('modal-open');
    }
  }

  closeLightbox(): void {
    this.lightboxImg.set(null);
    if (typeof document !== 'undefined') {
      document.body.classList.remove('modal-open');
    }
  }
}
