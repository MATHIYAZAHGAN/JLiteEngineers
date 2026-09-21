import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { CartDrawerComponent } from './components/cart-drawer/cart-drawer.component';
import { PoliciesComponent } from './components/policies/policies.component';
import { AdminPortalComponent } from './components/admin-portal/admin-portal.component';
import { MobileNavComponent } from './components/mobile-nav/mobile-nav.component';
import { AuthModalComponent } from './components/auth-modal/auth-modal.component';
import { SeoService } from './services/seo.service';
import { KeepAliveService } from './services/keep-alive.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
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
    ContactComponent,
    FooterComponent,
    CartDrawerComponent,
    MobileNavComponent,
    AuthModalComponent
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private seoService = inject(SeoService);
  private keepAliveService = inject(KeepAliveService);
  public authService = inject(AuthService);

  ngOnInit(): void {
    this.seoService.initDefaultSeo();
    this.keepAliveService.initKeepAlive();
    this.authService.initializeAuth();
  }
}
