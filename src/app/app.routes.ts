import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'JLITE Engineers | Electrical Consultant & Contractor in Chennai | Light Pitcher'
  },
  {
    path: 'electrical-consultant-chennai',
    loadComponent: () =>
      import('./pages/electrical-consultant-chennai/electrical-consultant-chennai.component').then(
        m => m.ElectricalConsultantChennaiComponent
      ),
    title: 'Electrical Consultant in Chennai | JLITE Engineers'
  },
  {
    path: 'electrical-contractor-chennai',
    loadComponent: () =>
      import('./pages/electrical-contractor-chennai/electrical-contractor-chennai.component').then(
        m => m.ElectricalContractorChennaiComponent
      ),
    title: 'Electrical Contractor in Chennai | JLITE Engineers'
  },
  {
    path: 'light-pitcher-chennai',
    loadComponent: () =>
      import('./pages/light-pitcher-chennai/light-pitcher-chennai.component').then(
        m => m.LightPitcherChennaiComponent
      ),
    title: 'Light Pitcher in Chennai | JLITE Engineers'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

