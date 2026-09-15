import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../hero/hero.component';
import { AboutComponent } from '../about/about.component';
import { ClientsComponent } from '../clients/clients.component';
import { ProjectsComponent } from '../projects/projects.component';
import { FeaturesComponent } from '../features/features.component';
import { ProductsComponent } from '../products/products.component';
import { ElectricalContractorsComponent } from '../electrical-contractors/electrical-contractors.component';
import { ConsultancyServicesComponent } from '../consultancy-services/consultancy-services.component';
import { LightPitcherComponent } from '../light-pitcher/light-pitcher.component';
import { GetQuoteComponent } from '../get-quote/get-quote.component';
import { FaqComponent } from '../faq/faq.component';
import { ContactComponent } from '../contact/contact.component';
import { SeoService } from '../../services/seo.service';
import { StructuredDataService } from '../../services/structured-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    AboutComponent,
    ClientsComponent,
    ProjectsComponent,
    FeaturesComponent,
    ProductsComponent,
    ElectricalContractorsComponent,
    ConsultancyServicesComponent,
    LightPitcherComponent,
    GetQuoteComponent,
    FaqComponent,
    ContactComponent,
  ],
  template: `
    <app-hero />
    <app-about />
    <app-clients />
    <app-projects />
    <app-features />
    <app-products />
    <app-electrical-contractors />
    <app-consultancy-services />
    <app-light-pitcher />
    <app-faq />
    <app-get-quote />
    <app-contact />
  `
})
export class HomeComponent implements OnInit {
  constructor(
    private seoService: SeoService,
    private structuredDataService: StructuredDataService
  ) {}

  ngOnInit(): void {
    // Set comprehensive SEO meta tags for home page
    this.seoService.updateMetaTags({
      title: 'JLITE Engineers | Premium Electrical Solutions & MCB Switchgear',
      description: 'JLITE Engineers - India\'s trusted brand for premium MCB, MCCB, LED lighting, switchgear & electrical components. ISO certified electrical solutions for professionals.',
      keywords: 'JLITE Engineers, jliteengineers, jlite, JLITE electrical, MCB, MCCB, LED lighting, switchgear, electrical contractors, consultancy services, smart switches, wiring accessories',
      url: 'https://www.jliteengineers.com',
      type: 'website'
    });

    // Inject comprehensive structured data
    const allSchemas = [
      ...this.structuredDataService.getHomePageSchemas(),
      this.structuredDataService.getFAQSchema(),
      ...this.structuredDataService.getProductSchemas(),
      ...this.structuredDataService.getServiceSchemas()
    ];

    this.structuredDataService.injectSchemas(allSchemas);
  }
}
