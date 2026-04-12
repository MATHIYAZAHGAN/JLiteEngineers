import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-electrical-contractors',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './electrical-contractors.component.html',
})
export class ElectricalContractorsComponent {

  activeTab = 'hv';

  tabs = [
    { id: 'hv',   label: 'High Voltage',   icon: 'bolt' },
    { id: 'mv',   label: 'Medium Voltage',  icon: 'zap' },
    { id: 'lv',   label: 'Low Voltage',     icon: 'plug' },
    { id: 'maint',label: 'Maintenance',     icon: 'tool' },
  ];

  services: Record<string, { title: string; desc: string; points: string[]; stat: string; statLabel: string }> = {
    hv: {
      title: 'High Voltage Works (Up to 33kV)',
      desc: 'Licensed by the Government of Tamil Nadu to execute all HV installations, additions, and alterations up to 33,000 Volts with full statutory compliance.',
      points: [
        '33kV Substation Installation & Commissioning',
        'HV Cable Laying & Jointing',
        'Transformer Erection & Testing',
        'HV Panel Boards & Switchgear',
        'Electrical Inspectorate Clearances',
        'Load Flow & Protection Studies',
      ],
      stat: '33kV', statLabel: 'Max Authorised Voltage',
    },
    mv: {
      title: 'Medium Voltage Distribution',
      desc: 'Complete MV distribution solutions for industrial complexes, commercial buildings, and government establishments with precision engineering.',
      points: [
        '11kV Ring Main Unit Installation',
        'MV Switchgear & Protection Relays',
        'Metering & Instrumentation',
        'Power Factor Correction Systems',
        'MV Cable Termination & Testing',
        'SCADA Integration',
      ],
      stat: '11kV', statLabel: 'Distribution Networks',
    },
    lv: {
      title: 'Low Voltage Installations',
      desc: 'End-to-end LT electrical works for residential, commercial, and industrial projects — from DB boards to final circuit wiring.',
      points: [
        'LT Panel Boards & Distribution Boards',
        'Wiring for Residential & Commercial',
        'Industrial Machinery Wiring',
        'Earthing & Lightning Protection',
        'Emergency & Exit Lighting',
        'UPS & Battery Backup Systems',
      ],
      stat: '500+', statLabel: 'LT Projects Completed',
    },
    maint: {
      title: 'Operation & Maintenance',
      desc: 'Scheduled and emergency O&M services ensuring maximum uptime for your electrical infrastructure across all voltage levels.',
      points: [
        'Annual Maintenance Contracts (AMC)',
        'Preventive Maintenance Schedules',
        'Thermographic Scanning',
        'Insulation Resistance Testing',
        'Emergency Breakdown Response',
        'Energy Audit & Optimisation',
      ],
      stat: '24/7', statLabel: 'Emergency Response',
    },
  };

  milestones = [
    { year: '2010', event: 'Founded in Chennai with Grade A License' },
    { year: '2013', event: 'First 33kV substation project commissioned' },
    { year: '2016', event: 'Expanded to Kerala & Karnataka operations' },
    { year: '2019', event: 'Completed 200+ industrial projects milestone' },
    { year: '2022', event: 'Smart electrical systems division launched' },
    { year: '2025', event: '500+ projects, 4 states, 50K+ clients served' },
  ];

  setTab(id: string) { this.activeTab = id; }

  get activeService() { return this.services[this.activeTab]; }
}
