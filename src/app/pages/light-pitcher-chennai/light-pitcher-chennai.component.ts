import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { QuoteService } from '../../services/quote.service';

export interface LightPitcherItem {
  name: string;
  category: string;
  wattage: string;
  lumens: string;
  cct: string;
  ip: string;
  desc: string;
  img: string;
  tag: string;
}

@Component({
  selector: 'app-light-pitcher-chennai',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './light-pitcher-chennai.component.html'
})
export class LightPitcherChennaiComponent implements OnInit {
  private seoService = inject(SeoService);
  public quoteService = inject(QuoteService);

  activeFaq: number | null = null;
  activeFilter = 'all';

  luminaires: LightPitcherItem[] = [
    {
      name: 'Modular 2x2 Troffer & Workstation Lighting System',
      category: 'commercial',
      wattage: '36W',
      lumens: '4000lm',
      cct: '5000K',
      ip: 'IP40',
      desc: 'Modular 600×600mm recessed parabolic louver troffer and perimeter circular cove luminaire engineered for corporate open-plan workstations.',
      img: 'assets/light pitcher/Picture13.jpg',
      tag: 'Corporate IT'
    },
    {
      name: 'Ultra-Slim 2x2 LED Modular Ceiling Panel',
      category: 'commercial',
      wattage: '40W',
      lumens: '4400lm',
      cct: '6500K',
      ip: 'IP44',
      desc: 'Surface-flush edge-lit 600×600mm LED ceiling panel delivering uniform, low-glare daylight white illumination for corporate IT suites and meeting rooms.',
      img: 'assets/light pitcher/Picture18.jpg',
      tag: 'Best Seller'
    },
    {
      name: 'Suspended Architectural Linear Luminaire 4ft',
      category: 'architectural',
      wattage: '36W',
      lumens: '3960lm',
      cct: '4000K',
      ip: 'IP40',
      desc: 'Extruded anodized aluminium linear profile luminaire suspended with high-tensile steel aircraft cables for open-ceiling creative studios.',
      img: 'assets/light pitcher/Picture22.jpg',
      tag: 'Architectural'
    },
    {
      name: 'Executive Boardroom Linear Pendant System',
      category: 'architectural',
      wattage: '45W',
      lumens: '4950lm',
      cct: '3000K–4000K',
      ip: 'IP40',
      desc: 'Minimalist continuous architectural pendant with micro-prismatic optical diffuser delivering glare-free direct/indirect ambient lighting.',
      img: 'assets/light pitcher/Picture23.jpg',
      tag: 'Executive'
    },
    {
      name: 'Industrial High-Bay UFO Luminaire 150W',
      category: 'industrial',
      wattage: '150W',
      lumens: '21000lm',
      cct: '6500K',
      ip: 'IP65',
      desc: 'Heavy-duty die-cast aluminum UFO high bay with 140 lm/W luminous efficacy engineered for manufacturing shop floors, warehouses, and logistics sheds.',
      img: 'assets/light pitcher/Picture29.jpg',
      tag: 'Industrial'
    },
    {
      name: 'Architectural Double-Emission Wall Sconce',
      category: 'architectural',
      wattage: '18W',
      lumens: '1800lm',
      cct: '3000K Warm White',
      ip: 'IP65',
      desc: 'Contemporary dual up-and-down beam wall luminaire in matte powder-coated finish for executive lobby facades and hospitality corridors.',
      img: 'assets/light pitcher/Picture27.jpg',
      tag: 'Facade & Lobby'
    }
  ];

  get filteredLuminaires(): LightPitcherItem[] {
    if (this.activeFilter === 'all') {
      return this.luminaires;
    }
    return this.luminaires.filter(l => l.category === this.activeFilter);
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
  }

  ngOnInit(): void {
    this.seoService.setPageSeo({
      title: 'Light Pitcher in Chennai | JLITE Engineers',
      description:
        'Explore Light Pitcher lighting products and solutions from JLITE Engineers in Chennai. View available products, specifications and request a quotation.',
      canonicalUrl: 'https://www.jliteengineers.com/light-pitcher-chennai/',
      keywords:
        'Light Pitcher in Chennai, Light Pitcher lighting solutions in Chennai, LED lighting supplier in Chennai, commercial LED troffer Chennai, architectural linear lighting Chennai, industrial high bay LED Chennai, 2x2 modular ceiling panel Tamil Nadu',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': 'Light Pitcher Lighting Solutions in Chennai',
        'brand': {
          '@type': 'Brand',
          'name': 'Light Pitcher by JLITE Engineers'
        },
        'description':
          'Commercial and architectural LED luminaires including 2x2 modular troffers, suspended linear profiles, and industrial UFO high bays engineered for high energy efficiency and 50,000-hour operational lifespan in Chennai.',
        'offers': {
          '@type': 'AggregateOffer',
          'priceCurrency': 'INR',
          'lowPrice': '1200',
          'highPrice': '18500',
          'offerCount': '30',
          'availability': 'https://schema.org/InStock',
          'seller': {
            '@type': 'LocalBusiness',
            'name': 'JLITE Engineers',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'No.338, Vijaya Nagar, 6th Main Road, Velachery',
              'addressLocality': 'Chennai',
              'addressRegion': 'Tamil Nadu',
              'postalCode': '600042',
              'addressCountry': 'IN'
            }
          }
        }
      }
    });

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }

  toggleFaq(index: number): void {
    this.activeFaq = this.activeFaq === index ? null : index;
  }
}

