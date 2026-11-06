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
      title: 'Electrical Consultant in Chennai | JLite',
      description:
        'Looking for an electrical consultant in Chennai? Explore JLite\' electrical engineering consultancy, design and project support services. Contact us to discuss your requirements.',
      canonicalUrl: 'https://www.jliteengineers.com/electrical-consultant-chennai/',
      keywords:
        'Electrical consultant in Chennai, Electrical consultancy services in Chennai, Electrical engineering consultant in Chennai, CEIG approval consultant Chennai, single line diagram electrical design Chennai, electrical load calculation Tamil Nadu, industrial electrical consultancy Chennai, electrical safety audit Chennai, thermography audit Chennai, transformer consultant Chennai',
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
                'item': 'https://www.jliteengineers.com/#consultancy-services'
              },
              {
                '@type': 'ListItem',
                'position': 3,
                'name': 'Electrical Consultant in Chennai',
                'item': 'https://www.jliteengineers.com/electrical-consultant-chennai/'
              }
            ]
          },
          {
            '@type': ['ProfessionalService', 'Service'],
            '@id': 'https://www.jliteengineers.com/electrical-consultant-chennai/#service',
            'name': 'JLite - Electrical Consultant in Chennai',
            'serviceType': 'Electrical Engineering Consultancy & CEIG Approvals',
            'provider': {
              '@type': 'LocalBusiness',
              'name': 'JLite',
              'url': 'https://www.jliteengineers.com',
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
              'Expert electrical engineering consultancy services in Chennai: SLD preparation, load calculations, statutory CEIG drawing approvals, thermography surveys, and turnkey engineering support for industrial and commercial projects.'
          },
          {
            '@type': 'FAQPage',
            '@id': 'https://www.jliteengineers.com/electrical-consultant-chennai/#faq',
            'mainEntity': [
              {
                '@type': 'Question',
                'name': 'What does an electrical consultant in Chennai do?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'An electrical consultant designs the entire electrical power distribution architecture for your facility. At JLite, our consultancy covers load calculations, transformer and generator sizing, single-line diagrams (SLD), fault level analysis, statutory CEIG drawing approvals, bill of quantities (BOQ), and safety compliance under Tamil Nadu Electrical Inspectorate guidelines.'
                }
              },
              {
                '@type': 'Question',
                'name': 'Do you handle CEIG drawing approvals in Tamil Nadu?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Yes. We prepare complete statutory drawing submittals to the Chief Electrical Inspector to Government (CEIG) of Tamil Nadu. We assist clients through initial drawing scrutiny, compliance site inspections, safety certificates, and final charging sanctions for installations exceeding 250kVA or operating at high voltage (11kV/22kV/33kV).'
                }
              },
              {
                '@type': 'Question',
                'name': 'How does power quality consultancy help reduce electricity bills?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Our harmonic audits and power factor consultancy identify low power factor penalties charged by TANGEDCO. By designing appropriately rated Automatic Power Factor Correction (APFC) panels and Active Harmonic Filters (AHF), we restore power factor to near-unity (0.99), completely eliminating penalties and reducing cable thermal losses.'
                }
              },
              {
                '@type': 'Question',
                'name': 'What is included in an electrical safety audit and infrared thermography study?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Our certified electrical safety audit includes thermal infrared imaging of switchgear and busbars to pinpoint hotspots and loose contacts, earth pit resistance testing to IS 3043, breaker trip timing tests, relay calibration, and a comprehensive CEA / NBC safety compliance report required for factory license renewals and insurance audits.'
                }
              },
              {
                '@type': 'Question',
                'name': 'Where can we meet JLite in Chennai?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'You can visit our Head Office at No.338, Vijaya Nagar, 6th Main Road, Velachery, Chennai - 600042, or our Branch Office at 7/23 A3, 2nd Floor, Police Officer Road, St Thomas Mount, Chennai - 600016. Our engineers also conduct on-site project walkthroughs across Chennai and industrial corridors.'
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

