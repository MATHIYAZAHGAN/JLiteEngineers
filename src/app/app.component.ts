import { Component } from '@angular/core';
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
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {}
