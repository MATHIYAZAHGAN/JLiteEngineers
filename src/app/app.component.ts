import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { FeaturesComponent } from './components/features/features.component';
import { ProductsComponent } from './components/products/products.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { ElectricalContractorsComponent } from './components/electrical-contractors/electrical-contractors.component';
import { ConsultancyServicesComponent } from './components/consultancy-services/consultancy-services.component';
import { LightPitcherComponent } from './components/light-pitcher/light-pitcher.component';
import { GetQuoteComponent } from './components/get-quote/get-quote.component';
import { FaqComponent } from './components/faq/faq.component';
import { SeoService } from './services/seo.service';
import { StructuredDataService } from './services/structured-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
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
    FooterComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private seoService: SeoService,
    private structuredDataService: StructuredDataService
  ) {}

  ngOnInit(): void {
    // Set comprehensive SEO meta tags
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
