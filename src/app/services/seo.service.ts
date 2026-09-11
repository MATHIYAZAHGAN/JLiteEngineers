import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly baseUrl = 'https://www.jliteengineers.com';
  private readonly defaultImage = 'https://www.jliteengineers.com/assets/og-image.jpg';
  private readonly siteName = 'JLITE Engineers';

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  updateMetaTags(config: SEOConfig): void {
    const fullTitle = config.title.includes('JLITE') 
      ? config.title 
      : `${config.title} | JLITE Engineers`;
    
    const pageUrl = config.url || this.baseUrl;
    const imageUrl = config.image || this.defaultImage;

    // Set title
    this.title.setTitle(fullTitle);

    // Basic meta tags
    this.meta.updateTag({ name: 'description', content: config.description });
    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }
    this.meta.updateTag({ name: 'author', content: config.author || 'JLITE Engineers' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' });

    // Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:type', content: config.type || 'website' });
    this.meta.updateTag({ property: 'og:url', content: pageUrl });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ property: 'og:image:alt', content: fullTitle });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ property: 'og:site_name', content: this.siteName });
    this.meta.updateTag({ property: 'og:locale', content: 'en_US' });

    // Twitter Card tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
    this.meta.updateTag({ name: 'twitter:image:alt', content: fullTitle });

    // Article-specific tags
    if (config.publishedTime) {
      this.meta.updateTag({ property: 'article:published_time', content: config.publishedTime });
    }
    if (config.modifiedTime) {
      this.meta.updateTag({ property: 'article:modified_time', content: config.modifiedTime });
    }
    if (config.section) {
      this.meta.updateTag({ property: 'article:section', content: config.section });
    }
    if (config.tags && config.tags.length > 0) {
      config.tags.forEach(tag => {
        this.meta.updateTag({ property: 'article:tag', content: tag });
      });
    }

    // Canonical URL
    this.updateCanonicalUrl(pageUrl);
  }

  updateCanonicalUrl(url: string): void {
    if (isPlatformBrowser(this.platformId)) {
      let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', url);
    }
  }

  setDefaultMetaTags(): void {
    this.updateMetaTags({
      title: 'JLITE Engineers | Premium Electrical Solutions & MCB Switchgear',
      description: 'JLITE Engineers - India\'s trusted brand for premium MCB, MCCB, LED lighting, switchgear & electrical components. ISO certified electrical solutions for professionals.',
      keywords: 'JLITE Engineers, jliteengineers, jlite, JLITE electrical, MCB, MCCB, LED lighting, switchgear, electrical contractors, consultancy services',
      url: this.baseUrl,
      type: 'website'
    });
  }

  // Helper method to generate structured data
  generateOrganizationSchema(): string {
    return JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'JLITE Engineers',
      'alternateName': ['JLite Engineers', 'jliteengineers', 'JLITE'],
      'url': 'https://www.jliteengineers.com',
      'logo': 'https://www.jliteengineers.com/assets/logo.png',
      'description': 'Premium electrical solutions including MCB, MCCB, LED lighting, switchgear and electrical components for professionals.',
      'email': 'contact@jliteengineers.com',
      'address': {
        '@type': 'PostalAddress',
        'addressCountry': 'IN'
      },
      'sameAs': [
        // Add your social media profiles here
      ],
      'areaServed': 'IN',
      'brand': {
        '@type': 'Brand',
        'name': 'JLITE'
      }
    });
  }

  generateWebSiteSchema(): string {
    return JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'JLITE Engineers',
      'alternateName': 'jliteengineers',
      'url': 'https://www.jliteengineers.com',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': 'https://www.jliteengineers.com/?s={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      }
    });
  }

  generateProductSchema(product: {
    name: string;
    description: string;
    image?: string;
    brand?: string;
    category?: string;
  }): string {
    return JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      'name': product.name,
      'description': product.description,
      'image': product.image || this.defaultImage,
      'brand': {
        '@type': 'Brand',
        'name': product.brand || 'JLITE'
      },
      'manufacturer': {
        '@type': 'Organization',
        'name': 'JLITE Engineers'
      },
      'category': product.category || 'Electrical Components',
      'offers': {
        '@type': 'AggregateOffer',
        'priceCurrency': 'INR',
        'availability': 'https://schema.org/InStock',
        'seller': {
          '@type': 'Organization',
          'name': 'JLITE Engineers'
        }
      }
    });
  }

  generateServiceSchema(service: {
    name: string;
    description: string;
    serviceType: string;
  }): string {
    return JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': service.name,
      'description': service.description,
      'serviceType': service.serviceType,
      'provider': {
        '@type': 'Organization',
        'name': 'JLITE Engineers',
        'url': 'https://www.jliteengineers.com'
      },
      'areaServed': {
        '@type': 'Country',
        'name': 'India'
      }
    });
  }

  generateFAQSchema(faqs: Array<{ question: string; answer: string }>): string {
    return JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqs.map(faq => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    });
  }

  generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): string {
    return JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': items.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.name,
        'item': item.url
      }))
    });
  }

  injectStructuredData(schema: string, id: string): void {
    if (isPlatformBrowser(this.platformId)) {
      // Remove existing script with same id
      const existingScript = document.getElementById(id);
      if (existingScript) {
        existingScript.remove();
      }

      // Create new script element
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = id;
      script.text = schema;
      document.head.appendChild(script);
    }
  }
}
