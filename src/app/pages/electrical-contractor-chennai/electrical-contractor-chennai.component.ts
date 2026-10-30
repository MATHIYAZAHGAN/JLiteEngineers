import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { QuoteService } from '../../services/quote.service';

@Component({
  selector: 'app-electrical-contractor-chennai',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './electrical-contractor-chennai.component.html'
})
export class ElectricalContractorChennaiComponent implements OnInit {
  private seoService = inject(SeoService);
  public quoteService = inject(QuoteService);

  activeFaq: number | null = null;

  ngOnInit(): void {
    this.seoService.setPageSeo({
      title: 'Electrical Contractor in Chennai | JLITE Engineers',
      description:
        'Explore electrical contracting and installation services from JLITE Engineers in Chennai, including applicable industrial and commercial electrical works. Contact us for project enquiries.',
      canonicalUrl: 'https://www.jliteengineers.com/electrical-contractor-chennai/',
      keywords:
        'Electrical contractor in Chennai, Industrial electrical contractor in Chennai, Commercial electrical contractor in Chennai, HT LT electrical contractor in Chennai, Substation installation contractor in Chennai, Transformer installation services in Chennai, Grade A electrical contractor Chennai, 33kV electrical contracting Tamil Nadu',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': 'Electrical Contractor in Chennai',
        'serviceType': 'High Voltage & Low Voltage Electrical Contracting',
        'provider': {
          '@type': 'ElectricalContractor',
          'name': 'JLITE Engineers',
          'url': 'https://www.jliteengineers.com',
          'telephone': '+917358178174',
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'No.338, Vijaya Nagar, 6th Main Road, Velachery',
            'addressLocality': 'Chennai',
            'addressRegion': 'Tamil Nadu',
            'postalCode': '600042',
            'addressCountry': 'IN'
          }
        },
        'areaServed': [
          { "@type": "City", "name": "Chennai" },
          { "@type": "AdministrativeArea", "name": "Tamil Nadu" },
          { "@type": "City", "name": "Sriperumbudur" },
          { "@type": "City", "name": "Guindy" },
          { "@type": "City", "name": "Ambattur" },
          { "@type": "City", "name": "OMR" }
        ],
        'description':
          'Government A-Grade licensed HT and LT electrical contractor in Chennai executing turnkey projects up to 33kV, substations, transformer installations, power distribution panels, and industrial electrification.'
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

