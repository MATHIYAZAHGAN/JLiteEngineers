import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { QuoteService } from '../../services/quote.service';

@Component({
  selector: 'app-electrical-consultant-chennai',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './electrical-consultant-chennai.component.html'
})
export class ElectricalConsultantChennaiComponent implements OnInit {
  private seoService = inject(SeoService);
  public quoteService = inject(QuoteService);

  activeFaq: number | null = null;

  ngOnInit(): void {
    this.seoService.setPageSeo({
      title: 'Electrical Consultant in Chennai | JLITE Engineers',
      description:
        'Looking for an electrical consultant in Chennai? Explore JLITE Engineers\' electrical engineering consultancy, electrical design and project support services for industrial and commercial projects.',
      canonicalUrl: 'https://www.jliteengineers.com/electrical-consultant-chennai/',
      keywords:
        'Electrical consultant in Chennai, Electrical consultancy services in Chennai, Electrical engineering consultant in Chennai, CEIG approval consultant Chennai, single line diagram electrical design Chennai, electrical load calculation Tamil Nadu, industrial electrical consultancy Chennai',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': 'Electrical Consultant in Chennai',
        'serviceType': 'Electrical Engineering Consultancy',
        'provider': {
          '@type': 'LocalBusiness',
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
          { '@type': 'City', 'name': 'Chennai' },
          { '@type': 'AdministrativeArea', 'name': 'Tamil Nadu' },
          { '@type': 'City', 'name': 'Sriperumbudur' },
          { '@type': 'City', 'name': 'Guindy' },
          { '@type': 'City', 'name': 'Ambattur' },
          { '@type': 'City', 'name': 'OMR' }
        ],
        'description':
          'Expert electrical consultancy services in Chennai covering electrical load design, SLD preparation, statutory CEIG approvals, and turnkey engineering support for industrial and commercial infrastructure.'
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

