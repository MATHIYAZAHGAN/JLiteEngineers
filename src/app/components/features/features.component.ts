import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './features.component.html',
})
export class FeaturesComponent {
  features = [
    { icon: 'certified', title: 'ISI & CE Certified',    desc: 'Every product meets international safety standards — ISI, CE, RoHS, and IEC certified for residential and industrial use.' },
    { icon: 'smart',     title: 'Smart Ready',           desc: 'Wi-Fi and Zigbee-enabled switches and panels compatible with Alexa, Google Home, and custom BMS systems.' },
    { icon: 'warranty',  title: '5-Year Warranty',       desc: 'Industry-leading warranty on all switchgear, MCBs, and wiring accessories. Zero-hassle replacement guarantee.' },
    { icon: 'delivery',  title: 'Fast B2B Supply',       desc: 'Bulk orders dispatched within 24 hours. Dedicated account managers for contractors and project teams.' },
  ];

  trustItems = [
    'ISO 9001 Certified',
    'IEC 60898 Compliant',
    'RoHS Approved',
    '50,000+ Happy Clients',
    '40+ Countries Served',
    '24h Order Dispatch',
  ];
}
