import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'JLite | Electrical Consultant & Contractor in Chennai | Light Fixtures'
  },
  {
    path: 'electrical-consultant-chennai',
    loadComponent: () =>
      import('./pages/electrical-consultant-chennai/electrical-consultant-chennai.component').then(
        m => m.ElectricalConsultantChennaiComponent
      ),
    title: 'Electrical Consultant in Chennai | JLite',
  },
  {
    path: 'electrical-contractors-chennai',
    loadComponent: () =>
      import('./pages/electrical-contractor-chennai/electrical-contractor-chennai.component').then(
        m => m.ElectricalContractorChennaiComponent
      ),
    title: 'Electrical Contractor in Chennai | JLite',
  },
  {
    path: 'electrical-contractor-chennai',
    redirectTo: 'electrical-contractors-chennai',
    pathMatch: 'full'
  },
  {
    path: 'light-fixtures-suppliers-chennai',
    loadComponent: () =>
      import('./pages/light-fixtures-suppliers-chennai/light-fixtures-suppliers-chennai.component').then(
        m => m.LightFixturesSuppliersChennaiComponent
      ),
    title: 'Light Fixtures Suppliers in Chennai | JLite',
  },
  {
    path: 'light-pitcher-chennai',
    redirectTo: 'light-fixtures-suppliers-chennai',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

