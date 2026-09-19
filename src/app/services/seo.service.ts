import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private document = inject(DOCUMENT);

  initDefaultSeo(): void {
    this.setTitle('JLite Engineers | Govt. A-Grade Electrical Contractors & Switchgear Suppliers');
    this.setMetaDescription(
      'M/s. JLITE Electrical Engineer\'s and Contractor - Premier electrical contracting up to 33kV, high-efficiency switchgear, MCBs, RCCBs, DB Boxes, and smart switches in Chennai, Tamil Nadu.'
    );
    this.setKeywords(
      'electrical contractors chennai, 33kV contracting, switchgear suppliers, MCB 32A, RCCB, DB box, smart switches, armoured cables, JLite Engineers, ISI certified electrical components'
    );
    this.injectLocalBusinessSchema();
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

  injectLocalBusinessSchema(): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'ElectricalContractor',
      'name': 'M/s. JLITE Electrical Engineer\'s and Contractor',
      'url': 'https://www.jliteengineers.com',
      'telephone': '+917358178174',
      'email': 'jlite2025@gmail.com',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'No.338, Vijaya Nagar, 6th Main Road, Velachery',
        'addressLocality': 'Chennai',
        'addressRegion': 'Tamil Nadu',
        'postalCode': '600042',
        'addressCountry': 'IN'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': '12.9756',
        'longitude': '80.2207'
      },
      'openingHoursSpecification': {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'opens': '09:00',
        'closes': '19:00'
      },
      'hasOfferCatalog': {
        '@type': 'OfferCatalog',
        'name': 'Electrical Products & Contracting Services',
        'itemListElement': [
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'High Voltage Electrical Contracting up to 33kV' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Product', 'name': 'Miniature Circuit Breakers (MCB) & Switchgear' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Product', 'name': 'Smart Touch Switches & Automation' } }
        ]
      }
    };

    let scriptTag = this.document.getElementById('json-ld-schema') as HTMLScriptElement;
    if (!scriptTag) {
      scriptTag = this.document.createElement('script');
      scriptTag.id = 'json-ld-schema';
      scriptTag.type = 'application/ld+json';
      this.document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(schema);
  }
}
