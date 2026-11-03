import { Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { environment } from '../../../environments/environment';

export interface AboutFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface AboutStat {
  label: string;
  value: string;
  icon?: string;
}

export interface AboutData {
  slug: string;
  heading: string;
  subheading: string;
  content: string;
  images: string[];
  stats: AboutStat[];
  features: AboutFeature[];
  isActive: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './about.component.html',
})
export class AboutComponent implements OnInit {
  private http = inject(HttpClient);

  // Default data populated with exact MongoDB DB Document structure
  aboutData = signal<AboutData>({
    slug: 'main-about',
    heading: 'About JLITE Engineers',
    subheading: 'Excellence in Electrical Engineering',
    content: 'JLITE Engineers is a leading provider of electrical contracting and lighting solutions. With years of experience and a commitment to quality, we deliver innovative solutions for all your electrical needs.',
    images: [
      'assets/Picture1.jpg',
      'assets/Picture2.jpg'
    ],
    stats: [
      {
        label: 'Years Experience',
        value: '12+',
        icon: 'calendar'
      },
      {
        label: 'Max Voltage Rating',
        value: '33kV',
        icon: 'zap'
      },
      {
        label: 'Projects Delivered',
        value: '500+',
        icon: 'award'
      },
      {
        label: 'Client Retention',
        value: '99.4%',
        icon: 'users'
      }
    ],
    features: [
      {
        title: "Govt. Grade 'A' Licensed",
        description: 'Authorised by Tamil Nadu Electrical Licensing Board for HV/MV/LV works up to 33kV.',
        icon: 'license'
      },
      {
        title: 'CEIG Approvals & Statutory Liaison',
        description: 'Seamless statutory clearances with the Chief Electrical Inspector to Government.',
        icon: 'approval'
      },
      {
        title: 'Turnkey EPC Capabilities',
        description: 'Design, procurement, erection, testing, and commissioning under single-point responsibility.',
        icon: 'turnkey'
      }
    ],
    isActive: true,
    order: 1,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  });

  get maxRating(): string {
    const stat = this.aboutData().stats.find(s => 
      s.label.toLowerCase().includes('max voltage') || s.label.toLowerCase().includes('voltage') || s.label.toLowerCase().includes('rating')
    );
    return stat ? stat.value : '33kV';
  }

  getStatIcon(s: AboutStat): string {
    if (s.icon && s.icon.trim()) return s.icon;
    const lbl = (s.label || '').toLowerCase();
    if (lbl.includes('year') || lbl.includes('exp')) return 'calendar';
    if (lbl.includes('volt') || lbl.includes('rating') || lbl.includes('kv')) return 'zap';
    if (lbl.includes('project') || lbl.includes('deliver') || lbl.includes('product')) return 'award';
    if (lbl.includes('retention') || lbl.includes('client') || lbl.includes('happy')) return 'users';
    return 'award';
  }

  getFeatureIcon(feature: AboutFeature): string {
    if (feature.icon && feature.icon.trim()) return feature.icon;
    const t = (feature.title || '').toLowerCase();
    if (t.includes('license') || t.includes('grade') || t.includes('govt') || t.includes('award') || t.includes('expert')) return 'license';
    if (t.includes('ceig') || t.includes('approval') || t.includes('liaison') || t.includes('statutory') || t.includes('shield') || t.includes('quality')) return 'approval';
    if (t.includes('turnkey') || t.includes('epc') || t.includes('capabilit') || t.includes('support') || t.includes('team')) return 'turnkey';
    return 'license';
  }

  companyFacts = [
    { label: 'Products',   val: '500+' },
    { label: 'Max Rating', val: '15kV' },
    { label: 'Clients',    val: '50K+' },
    { label: 'Support',    val: '24/7 Support' },
  ];

  paragraphs = [
    'We introduce ourselves as one of the leading electrical Contractors in Tamilnadu and we are in this field for over 10 years. We have been carrying out new electrical installation, additional installation and operation and maintenance works in many establishments throughout Tamilnadu and also in other states like Kerala, Karnataka, Andhra Pradesh.',
    'We hold \'A\' Grade contractor\'s License issued by the Tamilnadu state authorizing us to carry out all high voltage works, New as well as additions and alterations, up to a rating of 15,000 Volts (15kV), Medium & Low voltage Installations. We have also sister concerns and associates in other states through whom we can get works done in those states if necessary.',
    'We have a varied experience in the electrical field having done jobs in different type of industries, multistoried buildings, hospitals, star Hotels, Banks, Software complexes, etc. We are confident of taking up all kinds of works. We have appreciations of works and the quality of services given by us from all the Clients to whom we have done the works. We are entrusted with additional new works when once we do any works initially. This speaks about our quality of work and service.',
    'We have all the necessary testing instruments and all tools and tackles more than 5 sets and we have sufficient number of qualified and experienced engineers, senior electricians and technocrats whose help we could avail of for any special requirements needed.',
    'We have good relationship with the supply authorities like Electricity boards and other statutory Authorities like Electrical Inspectorate, Lift inspectorate etc. We are thorough with their requirements and so can be helpful in getting necessary clearance.',
  ];

  industries = [
    'Industrial Plants',
    'Multistoried Buildings',
    'Hospitals',
    'Star Hotels',
    'Banks',
    'Software Complexes',
    'Commercial Establishments',
    'Residential Complexes',
    'Educational Institutions',
    'Government Projects',
  ];

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      setTimeout(() => this.fetchAboutData(), 1400);
    } else {
      this.fetchAboutData();
    }
  }

  fetchAboutData(): void {
    this.http.get<AboutData>(`${environment.apiUrl}/cms/about`).pipe(
      catchError(() => of(null))
    ).subscribe({
      next: (res) => {
        if (res && res.heading) {
          this.aboutData.set(res);
        }
      }
    });
  }
}
