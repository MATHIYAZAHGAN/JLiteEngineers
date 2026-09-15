import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TermsComponent } from './components/terms/terms.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { RefundPolicyComponent } from './components/refund-policy/refund-policy.component';
import { ShippingPolicyComponent } from './components/shipping-policy/shipping-policy.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    title: 'JLITE Engineers | Premium Electrical Solutions & MCB Switchgear'
  },
  { 
    path: 'privacy-policy', 
    component: PrivacyComponent,
    title: 'Privacy Policy | JLITE Engineers'
  },
  { 
    path: 'refund-policy', 
    component: RefundPolicyComponent,
    title: 'Refund & Exchange Policy | JLITE Engineers'
  },
  { 
    path: 'shipping-policy', 
    component: ShippingPolicyComponent,
    title: 'Shipping & Delivery Policy | JLITE Engineers'
  },
  { 
    path: 'terms-of-service', 
    component: TermsComponent,
    title: 'Terms of Service | JLITE Engineers'
  },
  { 
    path: 'contact', 
    component: ContactPageComponent,
    title: 'Contact Us | JLITE Engineers'
  },
  // Legacy routes (redirects)
  { path: 'terms', redirectTo: 'terms-of-service', pathMatch: 'full' },
  { path: 'privacy', redirectTo: 'privacy-policy', pathMatch: 'full' },
  { 
    path: '**', 
    redirectTo: '',
    pathMatch: 'full'
  }
];
