import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StructuredDataService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * Injects multiple structured data schemas into the page
   */
  injectSchemas(schemas: Array<{ id: string; data: object }>): void {
    if (isPlatformBrowser(this.platformId)) {
      schemas.forEach(schema => {
        this.injectSchema(schema.id, schema.data);
      });
    }
  }

  /**
   * Injects a single structured data schema
   */
  private injectSchema(id: string, data: object): void {
    if (isPlatformBrowser(this.platformId)) {
      // Remove existing script with same id
      const existingScript = document.getElementById(id);
      if (existingScript) {
        existingScript.remove();
      }

      // Create and inject new script
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = id;
      script.text = JSON.stringify(data);
      document.head.appendChild(script);
    }
  }

  /**
   * Remove all structured data scripts
   */
  clearSchemas(): void {
    if (isPlatformBrowser(this.platformId)) {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => script.remove());
    }
  }

  /**
   * Get comprehensive schemas for JLITE Engineers homepage
   */
  getHomePageSchemas(): Array<{ id: string; data: object }> {
    return [
      {
        id: 'organization-schema',
        data: {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          'name': 'JLITE Engineers',
          'alternateName': ['JLite Engineers', 'jliteengineers', 'JLITE', 'jlite'],
          'url': 'https://www.jliteengineers.com',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://www.jliteengineers.com/assets/logo.png',
            'width': 250,
            'height': 60
          },
          'description': 'JLITE Engineers - Leading manufacturer and supplier of premium electrical components including MCB, MCCB, LED lighting, switchgear, and wiring accessories for professional electrical contractors and consultants.',
          'foundingDate': '2010',
          'email': 'contact@jliteengineers.com',
          'address': {
            '@type': 'PostalAddress',
            'addressCountry': 'IN'
          },
          'areaServed': {
            '@type': 'Country',
            'name': 'India'
          },
          'brand': {
            '@type': 'Brand',
            'name': 'JLITE'
          },
          'slogan': 'Premium Electrical Solutions for Professionals'
        }
      },
      {
        id: 'website-schema',
        data: {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          'name': 'JLITE Engineers',
          'alternateName': 'jliteengineers',
          'url': 'https://www.jliteengineers.com',
          'description': 'Official website of JLITE Engineers - Your trusted source for electrical components',
          'publisher': {
            '@type': 'Organization',
            'name': 'JLITE Engineers'
          },
          'potentialAction': {
            '@type': 'SearchAction',
            'target': {
              '@type': 'EntryPoint',
              'urlTemplate': 'https://www.jliteengineers.com/?s={search_term_string}'
            },
            'query-input': 'required name=search_term_string'
          }
        }
      },
      {
        id: 'local-business-schema',
        data: {
          '@context': 'https://schema.org',
          '@type': 'ElectricalContractor',
          'name': 'JLITE Engineers',
          'image': 'https://www.jliteengineers.com/assets/og-image.jpg',
          'url': 'https://www.jliteengineers.com',
          'telephone': '+91-XXXXXXXXXX',
          'email': 'contact@jliteengineers.com',
          'priceRange': '$$',
          'areaServed': 'India',
          'hasOfferCatalog': {
            '@type': 'OfferCatalog',
            'name': 'Electrical Components',
            'itemListElement': [
              {
                '@type': 'OfferCatalog',
                'name': 'MCB & MCCB',
                'itemListElement': [
                  {
                    '@type': 'Offer',
                    'itemOffered': {
                      '@type': 'Service',
                      'name': 'Miniature Circuit Breakers (MCB)'
                    }
                  }
                ]
              },
              {
                '@type': 'OfferCatalog',
                'name': 'LED Lighting Solutions',
                'itemListElement': [
                  {
                    '@type': 'Offer',
                    'itemOffered': {
                      '@type': 'Product',
                      'name': 'LED Lighting Systems'
                    }
                  }
                ]
              }
            ]
          }
        }
      }
    ];
  }

  /**
   * Get FAQ schema for common JLITE questions
   */
  getFAQSchema(): { id: string; data: object } {
    return {
      id: 'faq-schema',
      data: {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'What products does JLITE Engineers manufacture?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'JLITE Engineers manufactures a comprehensive range of electrical components including MCB (Miniature Circuit Breakers), MCCB (Moulded Case Circuit Breakers), LED lighting solutions, switchgear, smart switches, and premium wiring accessories for professional electrical installations.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Is JLITE a certified electrical components manufacturer?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes, JLITE Engineers is an ISO certified manufacturer of electrical components. All our products meet international quality standards and safety certifications required for professional electrical installations.'
            }
          },
          {
            '@type': 'Question',
            'name': 'What services does JLITE Engineers provide?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'JLITE Engineers provides electrical contracting services, consultancy services for electrical projects, LED lighting design and installation, and premium electrical components supply for commercial and industrial applications.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Where can I buy JLITE electrical products?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'JLITE electrical products are available through our authorized dealers across India. You can also contact us directly through our website at jliteengineers.com for bulk orders and professional installations.'
            }
          },
          {
            '@type': 'Question',
            'name': 'What makes JLITE MCBs different from other brands?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'JLITE MCBs feature premium build quality, advanced safety mechanisms, longer lifespan, and consistent performance. They are specifically designed for professional electrical contractors and meet stringent quality standards.'
            }
          }
        ]
      }
    };
  }

  /**
   * Get product schemas for JLITE product categories
   */
  getProductSchemas(): Array<{ id: string; data: object }> {
    return [
      {
        id: 'product-mcb-schema',
        data: {
          '@context': 'https://schema.org',
          '@type': 'Product',
          'name': 'JLITE MCB - Miniature Circuit Breakers',
          'description': 'Premium quality MCB (Miniature Circuit Breakers) from JLITE Engineers. Available in various ratings for residential and commercial applications.',
          'brand': {
            '@type': 'Brand',
            'name': 'JLITE'
          },
          'manufacturer': {
            '@type': 'Organization',
            'name': 'JLITE Engineers'
          },
          'category': 'Electrical Components',
          'image': 'https://www.jliteengineers.com/assets/products/mcb.jpg'
        }
      },
      {
        id: 'product-led-schema',
        data: {
          '@context': 'https://schema.org',
          '@type': 'Product',
          'name': 'JLITE LED Lighting Solutions',
          'description': 'Energy-efficient LED lighting solutions from JLITE Engineers. Professional-grade LED lights for commercial and industrial applications.',
          'brand': {
            '@type': 'Brand',
            'name': 'JLITE'
          },
          'manufacturer': {
            '@type': 'Organization',
            'name': 'JLITE Engineers'
          },
          'category': 'LED Lighting',
          'image': 'https://www.jliteengineers.com/assets/products/led.jpg'
        }
      }
    ];
  }

  /**
   * Get service schemas for JLITE services
   */
  getServiceSchemas(): Array<{ id: string; data: object }> {
    return [
      {
        id: 'service-contractors-schema',
        data: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          'name': 'Electrical Contracting Services',
          'description': 'Professional electrical contracting services by JLITE Engineers. Complete electrical installation, maintenance, and project management for commercial and industrial projects.',
          'serviceType': 'Electrical Contracting',
          'provider': {
            '@type': 'Organization',
            'name': 'JLITE Engineers',
            'url': 'https://www.jliteengineers.com'
          },
          'areaServed': {
            '@type': 'Country',
            'name': 'India'
          },
          'category': 'Electrical Services'
        }
      },
      {
        id: 'service-consultancy-schema',
        data: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          'name': 'Electrical Consultancy Services',
          'description': 'Expert electrical consultancy services from JLITE Engineers. Professional guidance for electrical project design, planning, and implementation.',
          'serviceType': 'Electrical Consultancy',
          'provider': {
            '@type': 'Organization',
            'name': 'JLITE Engineers',
            'url': 'https://www.jliteengineers.com'
          },
          'areaServed': {
            '@type': 'Country',
            'name': 'India'
          },
          'category': 'Consulting Services'
        }
      }
    ];
  }
}
