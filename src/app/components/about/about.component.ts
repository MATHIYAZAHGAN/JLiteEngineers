import { Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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
        label: 'Products',
        value: '500+',
        icon: 'check-circle'
      },
      {
        label: 'Max Rating',
        value: '15kV',
        icon: 'zap'
      },
      {
        label: 'Clients',
        value: '50K+',
        icon: 'users'
      }
    ],
    features: [
      {
        title: 'Expert Team',
        description: 'Certified professionals with extensive experience',
        icon: 'award'
      },
      {
        title: 'Quality Materials',
        description: 'We use only premium, certified materials',
        icon: 'shield'
      },
      {
        title: '24/7 Support',
        description: 'Round-the-clock customer support',
        icon: 'phone'
      }
    ],
    isActive: true,
    order: 1,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  });

  get maxRating(): string {
    const stat = this.aboutData().stats.find(s => 
      s.label.toLowerCase().includes('max rating') || s.label.toLowerCase().includes('rating')
    );
    return stat ? stat.value : '15kV';
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
    this.fetchAboutData();
  }

  fetchAboutData(): void {
    this.http.get<AboutData>(`${environment.apiUrl}/cms/about`).subscribe({
      next: (res) => {
        if (res && res.heading) {
          this.aboutData.set(res);
        }
      },
      error: () => {
        // Fallback to default document data
      }
    });
  }
}
