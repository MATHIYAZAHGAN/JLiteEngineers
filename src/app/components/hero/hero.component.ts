import { Component, ViewChild, ElementRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { CmsService, HeroData } from '../../services/cms.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './hero.component.html',
})
export class HeroComponent implements OnInit {
  private cmsService = inject(CmsService);

  heroData = signal<HeroData>({
    slug: 'main-hero',
    badgeText: 'PREMIUM ELECTRICAL SOLUTIONS',
    title: 'JLITE Engineers Power Your World',
    highlightText: 'A-Grade Electrical Contractor • Up to 33kV',
    subtitle: 'A-Grade Electrical Contractor • Up to 33kV',
    description: 'Manufacturer & Direct Supplier of ISI/CE Certified Switchgear, MCBs, RCCBs, DB Boxes, Smart Touch Switches & Armoured Cables.',
    buttonText: 'Browse Catalogue',
    buttonLink: '#products',
    backgroundImage: 'assets/hero-panel.png',
    videoUrl: null,
    isActive: true,
    order: 1,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    trustStats: [
      { value: '50,000+', label: 'Contractors & B2B Buyers' },
      { value: '33kV', label: 'Max Rating License' },
      { value: '500+', label: 'Certified Products' },
      { value: '24/7', label: 'Support Assistance' }
    ],
    imageUrl: 'assets/hero-panel.png',
    ctaPrimary: 'Browse Catalogue',
    ctaSecondary: 'Contact Engineering'
  });

  @ViewChild('panelImg') panelImg!: ElementRef<HTMLImageElement>;

  ngOnInit(): void {
    this.cmsService.getHero().subscribe({
      next: (data) => {
        if (data) {
          this.heroData.set({
            ...this.heroData(),
            ...data,
            badgeText: 'PREMIUM ELECTRICAL SOLUTIONS',
            title: 'JLITE Engineers Power Your World',
            highlightText: 'A-Grade Electrical Contractor • Up to 33kV',
            subtitle: 'A-Grade Electrical Contractor • Up to 33kV',
            description: 'Manufacturer & Direct Supplier of ISI/CE Certified Switchgear, MCBs, RCCBs, DB Boxes, Smart Touch Switches & Armoured Cables.'
          });
        }
      }
    });
  }

  onPanelHover(event: MouseEvent) {
    const wrap = event.currentTarget as HTMLElement;
    const img = wrap.querySelector('.hero-panel-img') as HTMLElement;
    if (!img) return;
    img.style.animation = 'none';
    img.offsetHeight;
    img.style.animation = 'panel-spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
  }
}
