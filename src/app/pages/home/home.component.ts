import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { AboutComponent } from '../../components/about/about.component';
import { ClientsComponent } from '../../components/clients/clients.component';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { FeaturesComponent } from '../../components/features/features.component';
import { ProductsComponent } from '../../components/products/products.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { ElectricalContractorsComponent } from '../../components/electrical-contractors/electrical-contractors.component';
import { ConsultancyServicesComponent } from '../../components/consultancy-services/consultancy-services.component';
import { LightPitcherComponent } from '../../components/light-pitcher/light-pitcher.component';
import { GetQuoteComponent } from '../../components/get-quote/get-quote.component';
import { PoliciesComponent } from '../../components/policies/policies.component';
import { AdminPortalComponent } from '../../components/admin-portal/admin-portal.component';
import { SeoService } from '../../services/seo.service';
import { AuthService } from '../../services/auth.service';
import { QuoteService } from '../../services/quote.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    FeaturesComponent,
    AboutComponent,
    ProductsComponent,
    ElectricalContractorsComponent,
    ConsultancyServicesComponent,
    LightPitcherComponent,
    GetQuoteComponent,
    ProjectsComponent,
    ClientsComponent,
    PoliciesComponent,
    AdminPortalComponent,
    ContactComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public seoService = inject(SeoService);
  public authService = inject(AuthService);
  public quoteService = inject(QuoteService);

  ngOnInit(): void {
    this.seoService.initDefaultSeo();
  }
}

