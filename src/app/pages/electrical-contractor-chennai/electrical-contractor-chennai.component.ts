import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { QuoteService } from '../../services/quote.service';

@Component({
  selector: 'app-electrical-contractors-chennai',
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
      title: 'Electrical Contractor in Chennai | JLite Engineers',
      description:
        'Searching for an electrical contractor in Chennai? Explore JLite Engineers\' electrical installation, contracting and maintenance capabilities for eligible industrial and commercial projects.',
      canonicalUrl: 'https://www.jliteengineers.com/electrical-contractors-chennai/',
      keywords:
        'Electrical contractors in Chennai, Chennai, Electrical consultant in Chennai, Light pole supplier in Chennai, Electrical components supplier in Chennai, Electrical contractor Chennai, Industrial electrical contractors in Chennai, Electrical installation contractors in Chennai, HT LT electrical contractor in Chennai, Substation installation contractor in Chennai, Transformer installation services in Chennai',
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
                'name': 'Services',
                'item': 'https://www.jliteengineers.com/#electrical-contractors'
              },
              {
                '@type': 'ListItem',
                'position': 3,
                'name': 'Electrical Contractors in Chennai',
                'item': 'https://www.jliteengineers.com/electrical-contractors-chennai/'
              }
            ]
          },
          {
            '@type': ['ElectricalContractor', 'ProfessionalService'],
            '@id': 'https://www.jliteengineers.com/electrical-contractors-chennai/#service',
            'name': 'JLite Engineers - Electrical Contractors in Chennai',
            'url': 'https://www.jliteengineers.com/electrical-contractors-chennai/',
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
            'department': [
              {
                '@type': 'LocalBusiness',
                'name': 'JLite Engineers - St Thomas Mount Branch',
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
            'areaServed': [
              { '@type': 'City', 'name': 'Chennai' },
              { '@type': 'AdministrativeArea', 'name': 'Tamil Nadu' },
              { '@type': 'City', 'name': 'Sriperumbudur' },
              { '@type': 'City', 'name': 'Ambattur' },
              { '@type': 'City', 'name': 'Guindy' },
              { '@type': 'City', 'name': 'Oragadam' },
              { '@type': 'City', 'name': 'OMR' },
              { '@type': 'Country', 'name': 'India' }
            ],
            'hasOfferCatalog': {
              '@type': 'OfferCatalog',
              'name': 'Electrical Contracting & Engineering Services in Chennai',
              'itemListElement': [
                {
                  '@type': 'Offer',
                  'itemOffered': {
                    '@type': 'Service',
                    'name': 'Electrical Contractors in Chennai',
                    'description': 'Government Grade A licensed 33kV electrical contracting for industrial and commercial projects in Chennai.'
                  }
                },
                {
                  '@type': 'Offer',
                  'itemOffered': {
                    '@type': 'Service',
                    'name': 'Electrical Consultant in Chennai',
                    'description': 'Load calculations, single-line diagrams, engineering consultancy, and statutory CEIG liaison approvals.'
                  }
                },
                {
                  '@type': 'Offer',
                  'itemOffered': {
                    '@type': 'Service',
                    'name': 'Light Pole Supplier in Chennai',
                    'description': 'High mast lighting towers, octagonal street light poles, and outdoor commercial luminaire installation.'
                  }
                },
                {
                  '@type': 'Offer',
                  'itemOffered': {
                    '@type': 'Service',
                    'name': 'Electrical Components Supplier in Chennai',
                    'description': 'Direct supply of ISI and CE certified switchgear, MCBs, RCCBs, DB boxes, and power cables across Chennai and India.'
                  }
                }
              ]
            }
          },
          {
            '@type': 'FAQPage',
            'mainEntity': [
              {
                '@type': 'Question',
                'name': 'What electrical contracting services does JLite Engineers offer in Chennai?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'JLite Engineers is a Government Grade A licensed electrical contractor in Chennai executing turnkey HT and LT projects up to 33kV. Our services include substation installation, transformer erection, switchgear manufacturing, industrial factory electrification, commercial office power distribution, cable laying, and CEIG statutory clearances.'
                }
              },
              {
                '@type': 'Question',
                'name': 'Does JLite Engineers support industrial electrical projects?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Yes. JLite Engineers specializes in industrial electrical projects across Chennai, Sriperumbudur, Ambattur, and Oragadam. We manage high-voltage substations, main plant power distribution, heavy machinery cabling, busways, earthing grids, and motor control centers (MCC) under strict Indian Electricity Rules.'
                }
              },
              {
                '@type': 'Question',
                'name': 'Can customers enquire about electrical equipment supply across India?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Yes. While Chennai is our primary market for turnkey on-site electrical contracting, JLite Engineers operates an India-wide supply network providing ISI & CE certified switchgear, MCBs, RCCBs, distribution boxes, smart touch switches, armoured cables, light poles, and Light Fixtures commercial LED fixtures across all states in India.'
                }
              },
              {
                '@type': 'Question',
                'name': 'How can I request a quotation for an electrical project?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'You can click the "Request a Project Quotation" button on our website or email your Single-Line Diagram (SLD) or Bill of Quantities (BOQ) directly to jlite@jliteengineers.com. Our engineering team provides comprehensive commercial and technical proposals within 24 to 48 hours.'
                }
              },
              {
                '@type': 'Question',
                'name': 'How can I contact JLite Engineers for project requirements?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'You can reach JLite Engineers directly by email at jlite@jliteengineers.com or visit our Head Office at No.338, Vijaya Nagar, 6th Main Road, Velachery, Chennai - 600042, or our Branch Office at 7/23 A3, 2nd Floor, Police Officer Road, St Thomas Mount, Chennai - 600016.'
                }
              }
            ]
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
