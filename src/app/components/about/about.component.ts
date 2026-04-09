import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './about.component.html',
})
export class AboutComponent {

  stats = [
    { value: '10+',   label: 'Years of Experience' },
    { value: '33KV',  label: 'Max Voltage Authorised' },
    { value: '5+',    label: 'Sets of Equipment' },
    { value: '4',     label: 'States Covered' },
  ];

  companyFacts = [
    { label: 'License Grade',   val: "'A' Grade" },
    { label: 'Issued By',       val: 'Govt. of Tamilnadu' },
    { label: 'Sister Concerns', val: 'Kerala, KA, AP' },
    { label: 'Voltage Works',   val: 'HV · MV · LV' },
  ];

  strengths = [
    {
      icon: 'bolt',
      title: 'High Voltage Expertise',
      desc: 'Licensed to execute all HV works up to 33,000 V — new installations, additions, and alterations with full statutory compliance.',
    },
    {
      icon: 'shield',
      title: 'Statutory Clearances',
      desc: 'Strong ties with Electricity Boards, Electrical Inspectorate, and Lift Inspectorate ensure smooth approvals on every project.',
    },
    {
      icon: 'tool',
      title: 'Fully Equipped',
      desc: 'More than 5 complete sets of testing instruments, tools, and tackles ready for deployment on any scale of project.',
    },
    {
      icon: 'users',
      title: 'Qualified Team',
      desc: 'A skilled workforce of engineers, senior electricians, and technocrats available for standard and specialised requirements.',
    },
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

  // Work showcase images — 8 featured photos in a bento grid
  showcaseImages = [
    { src: 'assets/Picture23.png', span: 'lg:col-span-2 lg:row-span-2', label: 'HV Switchgear Installation' },
    { src: 'assets/Picture24.jpg', span: '',                             label: 'Panel Wiring' },
    { src: 'assets/Picture25.jpg', span: '',                             label: 'Site Inspection' },
    { src: 'assets/Picture26.jpg', span: '',                             label: 'Cable Laying' },
    { src: 'assets/Picture27.jpg', span: '',                             label: 'DB Installation' },
    { src: 'assets/Picture28.jpg', span: 'lg:col-span-2',               label: 'Industrial Complex' },
  ];
}
