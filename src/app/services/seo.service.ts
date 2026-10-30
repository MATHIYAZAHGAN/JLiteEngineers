import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface PageSeoConfig {
  title: string;
  description: string;
  canonicalUrl: string;
  keywords?: string;
  schema?: any;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private document = inject(DOCUMENT);
  private router = inject(Router, { optional: true });

  initDynamicSeoListener(): void {
    this.initDefaultSeo();

    if (!this.router) return;

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        const url = event.urlAfterRedirects || event.url;
        this.handleDynamicNavigation(url);
      });
  }

  handleDynamicNavigation(url: string): void {
    // Dedicated pages manage their own deep SEO via their component ngOnInit
    if (
      url.includes('electrical-consultant-chennai') ||
      url.includes('electrical-contractor-chennai') ||
      url.includes('light-pitcher-chennai')
    ) {
      return;
    }

    // Dynamic section-based and query-intent-based internal SEO
    if (url.includes('#consultancy') || url.includes('intent=consultant')) {
      this.setTitle('Electrical Consultant in Chennai | JLITE Engineers');
      this.setMetaDescription(
        'Expert electrical engineering consultancy in Chennai. SLD preparation, load calculation, power quality audits, and statutory CEIG approvals.'
      );
      this.setCanonicalUrl('https://www.jliteengineers.com/#consultancy-services');
    } else if (url.includes('#contractor') || url.includes('intent=contractor')) {
      this.setTitle('Electrical Contractor in Chennai | Govt. A-Grade 33kV | JLITE Engineers');
      this.setMetaDescription(
        "Govt. Grade 'A' licensed electrical contractor in Chennai executing HT/LT substations up to 33kV, transformer erections, and industrial installations."
      );
      this.setCanonicalUrl('https://www.jliteengineers.com/#electrical-contractors');
    } else if (url.includes('#light-pitcher') || url.includes('#lighting') || url.includes('intent=lighting')) {
      this.setTitle('Light Pitcher in Chennai | Commercial LED Luminaires | JLITE Engineers');
      this.setMetaDescription(
        'Explore Light Pitcher lighting solutions in Chennai: modular office troffers, industrial high bays, and architectural linear LED lighting.'
      );
      this.setCanonicalUrl('https://www.jliteengineers.com/#light-pitcher');
    } else if (url === '/' || url.startsWith('/#')) {
      // Re-apply primary overarching SEO
      this.initDefaultSeo();
    }
  }

  initDefaultSeo(): void {
    this.setPageSeo({
      title: 'JLITE Engineers | Electrical Consultant & Contractor in Chennai | Light Pitcher',
      description:
        'JLITE Engineers is a Govt. A-Grade licensed electrical contractor and electrical consultant in Chennai. Specializing in HT/LT substations up to 33kV, industrial electrical engineering, switchgear supply, and Light Pitcher commercial LED lighting solutions across Tamil Nadu.',
      canonicalUrl: 'https://www.jliteengineers.com/',
      keywords:
        'Electrical consultant in Chennai, Electrical contractor in Chennai, Light Pitcher in Chennai, Electrical consultancy services in Chennai, Electrical engineering consultant in Chennai, Industrial electrical contractor in Chennai, Commercial electrical contractor in Chennai, HT LT electrical contractor in Chennai, Substation installation contractor in Chennai, Transformer installation services in Chennai, Light Pitcher lighting solutions in Chennai, LED lighting supplier in Chennai'
    });
    this.injectLocalBusinessSchema();
  }

  setPageSeo(config: PageSeoConfig): void {
    this.setTitle(config.title);
    this.setMetaDescription(config.description);
    this.setCanonicalUrl(config.canonicalUrl);
    if (config.keywords) {
      this.setKeywords(config.keywords);
    }
    this.metaService.updateTag({ property: 'og:url', content: config.canonicalUrl });

    if (config.schema) {
      this.injectCustomSchema(config.schema, 'page-json-ld-schema');
    }
  }

  setTitle(title: string): void {
    this.titleService.setTitle(title);
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ name: 'twitter:title', content: title });
  }

  setMetaDescription(description: string): void {
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ name: 'twitter:description', content: description });
  }

  setKeywords(keywords: string): void {
    this.metaService.updateTag({ name: 'keywords', content: keywords });
  }

  setCanonicalUrl(url: string): void {
    let link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  injectCustomSchema(schema: any, scriptId: string): void {
    let scriptTag = this.document.getElementById(scriptId) as HTMLScriptElement;
    if (!scriptTag) {
      scriptTag = this.document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      this.document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(schema);
  }

  injectLocalBusinessSchema(): void {
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': ['ElectricalContractor', 'ProfessionalService'],
          '@id': 'https://www.jliteengineers.com/#organization',
          'name': "M/s. JLITE Electrical Engineer's and Contractor",
          'alternateName': ['JLITE Engineers', 'JLITE Electricals Chennai'],
          'url': 'https://www.jliteengineers.com',
          'logo': 'https://www.jliteengineers.com/assets/brand-logo.png',
          'image': 'https://www.jliteengineers.com/assets/brand-logo.png',
          'telephone': '+917358178174',
          'email': 'jlite@jliteengineers.com',
          'priceRange': '$$',
          'sameAs': [
            'https://www.instagram.com/jlite2026/reels/',
            'https://www.facebook.com/profile.php?id=61593258419189'
          ],
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'No.338, Vijaya Nagar, 6th Main Road, Velachery',
            'addressLocality': 'Chennai',
            'addressRegion': 'Tamil Nadu',
            'postalCode': '600042',
            'addressCountry': 'IN'
          },
          'department': [
            {
              '@type': 'LocalBusiness',
              'name': 'JLITE Engineers - St Thomas Mount Branch',
              'telephone': '+917358178174',
              'address': {
                '@type': 'PostalAddress',
                'streetAddress': '7/23 A3, 2nd Floor, Police Officer Road, St Thomas Mount',
                'addressLocality': 'Chennai',
                'addressRegion': 'Tamil Nadu',
                'postalCode': '600016',
                'addressCountry': 'IN'
              }
            }
          ],
          'geo': {
            '@type': 'GeoCoordinates',
            'latitude': '12.9756',
            'longitude': '80.2207'
          },
          'areaServed': [
            { '@type': 'City', 'name': 'Chennai' },
            { '@type': 'AdministrativeArea', 'name': 'Tamil Nadu' },
            { '@type': 'City', 'name': 'Sriperumbudur' },
            { '@type': 'City', 'name': 'Kanchipuram' },
            { '@type': 'City', 'name': 'Chengalpattu' }
          ],
          'openingHoursSpecification': {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            'opens': '09:00',
            'closes': '19:00'
          },
          'hasOfferCatalog': {
            '@type': 'OfferCatalog',
            'name': 'Electrical Consultancy, Contracting & Light Pitcher Solutions',
            'itemListElement': [
              {
                '@type': 'Offer',
                'itemOffered': {
                  '@type': 'Service',
                  'name': 'Electrical Consultant in Chennai',
                  'description': 'Comprehensive electrical engineering consultancy, system design, load calculation, single-line diagrams (SLD), and statutory CEIG approvals in Chennai.'
                }
              },
              {
                '@type': 'Offer',
                'itemOffered': {
                  '@type': 'Service',
                  'name': 'Electrical Contractor in Chennai',
                  'description': 'Government A-Grade licensed high voltage (HT) and low voltage (LT) electrical contracting up to 33kV, substations, transformer setups, and industrial installations.'
                }
              },
              {
                '@type': 'Offer',
                'itemOffered': {
                  '@type': 'Product',
                  'name': 'Light Pitcher Lighting Solutions in Chennai',
                  'description': 'Architectural and commercial LED troffers, suspended linear profiles, industrial high bays, and energy-efficient lighting systems.'
                }
              }
            ]
          }
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.jliteengineers.com/#faq',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': 'Who is the leading electrical consultant in Chennai for industrial and commercial projects?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'JLITE Engineers is a premier electrical consultant in Chennai providing end-to-end electrical design, load calculations, single-line diagrams (SLD), bill of quantities (BOQ), and statutory CEIG liaison approvals.'
              }
            },
            {
              '@type': 'Question',
              'name': 'What electrical contracting services does JLITE Engineers offer in Chennai?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'JLITE Engineers is a Government A-Grade licensed electrical contractor in Chennai executing turnkey HT and LT projects up to 33kV, substation installations, transformer setups, main LT panels, and heavy cable laying.'
              }
            },
            {
              '@type': 'Question',
              'name': 'What is Light Pitcher and where can I buy it in Chennai?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Light Pitcher is JLITE Engineers flagship architectural and commercial LED lighting brand in Chennai, offering 2x2 modular workstation troffers, suspended linear luminaires, and industrial high bays with up to 50,000 hours lifespan.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Where are JLITE Engineers offices located in Chennai?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'JLITE Engineers operates from its Head Office at No.338, Vijaya Nagar, 6th Main Road, Velachery, Chennai - 600042 and its Branch Office at 7/23 A3, 2nd Floor, Police Officer Road, St Thomas Mount, Chennai - 600016.'
              }
            }
          ]
        }
      ]
    };

    this.injectCustomSchema(schema, 'json-ld-schema');
  }
}
