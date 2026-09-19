import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface TrustStat {
  value: string;
  label: string;
}

export interface HeroData {
  title: string;
  highlightText: string;
  subtitle: string;
  badgeText: string;
  trustStats: TrustStat[];
  imageUrl: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  imageUrl: string;
  completionYear: string;
}

export interface ClientData {
  id: string;
  name: string;
  logoUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class CmsService {
  private http = inject(HttpClient);

  getHero(): Observable<HeroData> {
    return this.http.get<HeroData>(`${environment.apiUrl}/cms/hero`).pipe(
      catchError(() => of({
        title: 'Power. Safety. Excellence.',
        highlightText: "A-Grade Electrical Contractor • Up to 33kV",
        subtitle: 'Manufacturer & Direct Supplier of ISI/CE Certified Switchgear, MCBs, RCCBs, DB Boxes, Smart Touch Switches & Armoured Cables.',
        badgeText: 'ISI & CE Certified • 5-Year Warranty • 24h Express Dispatch',
        trustStats: [
          { value: '50,000+', label: 'Contractors & B2B Buyers' },
          { value: '33kV', label: 'A-Grade Govt. License' },
          { value: '40+', label: 'Countries Exported' },
          { value: '99.9%', label: 'On-Time Dispatch' }
        ],
        imageUrl: 'assets/Picture22.jpg',
        ctaPrimary: 'Explore Switchgear',
        ctaSecondary: 'Book 33kV Consultation'
      }))
    );
  }

  getProjects(): Observable<ProjectData[]> {
    return this.http.get<ProjectData[]>(`${environment.apiUrl}/cms/projects`).pipe(
      catchError(() => of([
        {
          id: '1',
          title: '33kV Substation Turnkey Contracting',
          category: 'High Voltage Contracting',
          location: 'Sriperumbudur Industrial Corridor, TN',
          description: 'Complete erection, testing, and commissioning of 33kV outdoor switchyard with vacuum circuit breakers.',
          imageUrl: 'assets/work/Picture34.jpg',
          completionYear: '2025'
        },
        {
          id: '2',
          title: 'Smart Commercial Lighting & Automation',
          category: 'Architectural Lighting',
          location: 'IT Park, OMR Chennai',
          description: '18W Tunable CCT Smart LED installation integrated with Zigbee touch panels and automatic lux sensors.',
          imageUrl: 'assets/work/Picture37.jpg',
          completionYear: '2025'
        },
        {
          id: '3',
          title: 'Industrial Power Distribution & Busduct',
          category: 'Switchgear & Panel Fabrication',
          location: 'Ambattur Industrial Estate, Chennai',
          description: 'Main LT distribution panel fabrication with 63A RCCB earth fault protection and SWA armoured cable laying.',
          imageUrl: 'assets/work/Picture38.jpg',
          completionYear: '2024'
        }
      ]))
    );
  }

  getClients(): Observable<ClientData[]> {
    return this.http.get<ClientData[]>(`${environment.apiUrl}/cms/clients`).pipe(
      catchError(() => of([
        { id: '1', name: 'L&T Construction', logoUrl: 'assets/Picture13.jpg' },
        { id: '2', name: 'TATA Projects', logoUrl: 'assets/Picture18.jpg' },
        { id: '3', name: 'BHEL', logoUrl: 'assets/Picture23.png' },
        { id: '4', name: 'Siemens India', logoUrl: 'assets/Picture24.jpg' },
        { id: '5', name: 'Schneider Electric', logoUrl: 'assets/Picture25.jpg' }
      ]))
    );
  }
}
