import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { QuoteService } from '../../services/quote.service';

export interface LightingFixtureItem {
  name: string;
  category: 'commercial' | 'architectural' | 'panels' | 'decorative' | 'industrial' | 'outdoor';
  wattage: string;
  lumens: string;
  cct: string;
  ip: string;
  desc: string;
  img: string;
  tag: string;
}

@Component({
  selector: 'app-light-fixtures-suppliers-chennai',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './light-fixtures-suppliers-chennai.component.html'
})
export class LightFixturesSuppliersChennaiComponent implements OnInit {
  private seoService = inject(SeoService);
  public quoteService = inject(QuoteService);

  activeFaq: number | null = null;
  activeFilter: string = 'all';

  fixtures: LightingFixtureItem[] = [
    {
      name: 'Modular 2x2 Troffer & Workstation Lighting System',
      category: 'commercial',
      wattage: '36W',
      lumens: '4,000 lm',
      cct: '4000K / 5000K',
      ip: 'IP40',
      desc: 'Modular 600×600mm recessed parabolic louver troffer engineered for corporate open-plan workstations, IT parks, and conference rooms. Low-glare UGR < 19 design.',
      img: 'assets/light pitcher/Picture13.jpg',
      tag: 'Commercial & Office'
    },
    {
      name: 'Ultra-Slim 2x2 LED Modular Ceiling Panel',
      category: 'panels',
      wattage: '40W',
      lumens: '4,400 lm',
      cct: '6500K Cool Day',
      ip: 'IP44',
      desc: 'Surface-flush edge-lit 600×600mm LED ceiling panel delivering uniform, shadow-free illumination for corporate IT suites, healthcare facilities, and institutions.',
      img: 'assets/light pitcher/Picture18.jpg',
      tag: 'LED Panels'
    },
    {
      name: 'Suspended Architectural Linear Luminaire 4ft',
      category: 'architectural',
      wattage: '36W',
      lumens: '3,960 lm',
      cct: '4000K Neutral',
      ip: 'IP40',
      desc: 'Extruded anodized aluminum linear profile luminaire suspended with high-tensile aircraft cables for open-ceiling creative studios, retail, and tech offices.',
      img: 'assets/light pitcher/Picture22.jpg',
      tag: 'Architectural Linear'
    },
    {
      name: 'Executive Boardroom Linear Pendant Luminaire',
      category: 'decorative',
      wattage: '45W',
      lumens: '4,950 lm',
      cct: '3000K–4000K Tunable',
      ip: 'IP40',
      desc: 'Minimalist continuous architectural pendant with micro-prismatic optical diffuser delivering glare-free direct and indirect ambient lighting for executive suites.',
      img: 'assets/light pitcher/Picture23.jpg',
      tag: 'Decorative & Pendant'
    },
    {
      name: 'Industrial High-Bay UFO Luminaire 150W',
      category: 'industrial',
      wattage: '150W',
      lumens: '21,000 lm',
      cct: '6500K Industrial',
      ip: 'IP65',
      desc: 'Heavy-duty die-cast aluminum UFO high bay with 140 lm/W luminous efficacy and 4kV surge protection for manufacturing shop floors, warehouses, and logistics hubs.',
      img: 'assets/light pitcher/Picture29.jpg',
      tag: 'Industrial High Bay'
    },
    {
      name: 'Architectural Dual-Emission Wall Sconce Fixture',
      category: 'architectural',
      wattage: '18W',
      lumens: '1,800 lm',
      cct: '3000K Warm White',
      ip: 'IP65',
      desc: 'Contemporary dual up-and-down beam wall luminaire in matte powder-coated aluminum finish for executive lobby facades, corridors, and hospitality entryways.',
      img: 'assets/light pitcher/Picture27.jpg',
      tag: 'Wall & Accent'
    },
    {
      name: 'Heavy-Duty Industrial LED Floodlight 100W/200W',
      category: 'outdoor',
      wattage: '100W–200W',
      lumens: '14,000–28,000 lm',
      cct: '5700K Daylight',
      ip: 'IP66',
      desc: 'Corrosion-resistant die-cast outdoor floodlight with toughened glass lens for factory yards, security perimeter lighting, parking lots, and building facades.',
      img: 'assets/work/Picture37.jpg',
      tag: 'Outdoor & Weather-Proof'
    },
    {
      name: 'Octagonal Street Light Pole & Luminaire System',
      category: 'outdoor',
      wattage: '60W–120W',
      lumens: '7,800–15,600 lm',
      cct: '5000K',
      ip: 'IP66',
      desc: 'Hot-dip galvanized octagonal street light pole with aerodynamic LED roadway fixture designed for internal industrial roads, private estates, and townships.',
      img: 'assets/work/Picture38.jpg',
      tag: 'Light Pole & Street'
    }
  ];

  get filteredFixtures(): LightingFixtureItem[] {
    if (this.activeFilter === 'all') {
      return this.fixtures;
    }
    return this.fixtures.filter(f => f.category === this.activeFilter);
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
  }

  ngOnInit(): void {
    this.seoService.setPageSeo({
      title: 'Light Fixtures Suppliers in Chennai | JLite',
      description:
        'Explore lighting fixtures from JLite, including commercial, architectural and decorative lighting solutions. Enquire about product availability and supply to Chennai.',
      canonicalUrl: 'https://www.jliteengineers.com/light-fixtures-suppliers-chennai/',
      keywords:
        'Light fixtures suppliers in Chennai, Lighting suppliers in Chennai, LED light suppliers in Chennai, Commercial lighting suppliers in Chennai, Architectural lighting suppliers in Chennai, Industrial lighting suppliers in Chennai, LED light fixtures wholesale suppliers in Chennai, Light fixtures in Chennai, LED lighting supplier in Chennai, 2x2 modular ceiling panel Tamil Nadu',
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BreadcrumbList',
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': 'https://www.jliteengineers.com/'
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Products',
                'item': 'https://www.jliteengineers.com/#products'
              },
              {
                '@type': 'ListItem',
                'position': 3,
                'name': 'Light Fixtures Suppliers in Chennai',
                'item': 'https://www.jliteengineers.com/light-fixtures-suppliers-chennai/'
              }
            ]
          },
          {
            '@type': ['LocalBusiness', 'ProfessionalService'],
            '@id': 'https://www.jliteengineers.com/light-fixtures-suppliers-chennai/#supplier',
            'name': 'JLite - Light Fixtures Suppliers in Chennai',
            'url': 'https://www.jliteengineers.com/light-fixtures-suppliers-chennai/',
            'telephone': '+917358178174',
            'email': 'jlite@jliteengineers.com',
            'priceRange': '$$',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'No.338, Vijaya Nagar, 6th Main Road, Velachery',
              'addressLocality': 'Chennai',
              'addressRegion': 'Tamil Nadu',
              'postalCode': '600042',
              'addressCountry': 'IN'
            },
            'areaServed': [
              { '@type': 'City', 'name': 'Chennai' },
              { '@type': 'AdministrativeArea', 'name': 'Tamil Nadu' },
              { '@type': 'Country', 'name': 'India' }
            ],
            'hasOfferCatalog': {
              '@type': 'OfferCatalog',
              'name': 'Commercial, Architectural & Industrial Lighting Fixtures',
              'itemListElement': [
                {
                  '@type': 'Offer',
                  'itemOffered': {
                    '@type': 'Service',
                    'name': 'Commercial & Office Lighting Fixtures Supply',
                    'description': 'Supply of low-glare modular 2x2 LED troffers and recessed panel luminaires for Chennai corporate offices and commercial buildings.'
                  }
                },
                {
                  '@type': 'Offer',
                  'itemOffered': {
                    '@type': 'Service',
                    'name': 'Architectural Linear & Profile Lighting',
                    'description': 'Suspended continuous linear profiles, wall-washers, and cove luminaires for modern workplace and retail architecture.'
                  }
                },
                {
                  '@type': 'Offer',
                  'itemOffered': {
                    '@type': 'Service',
                    'name': 'Industrial High Bay & Floodlighting',
                    'description': 'IP65/IP66 die-cast aluminum UFO high bay luminaires and heavy-duty floodlights for factories, warehouses, and logistics sheds.'
                  }
                }
              ]
            }
          }
        ]
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

