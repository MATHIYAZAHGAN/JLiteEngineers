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
    { value: '10+',  label: 'Years of Experience' },
    { value: '33KV', label: 'Max Voltage Authorised' },
    { value: '5+',   label: 'Sets of Equipment' },
    { value: '4',    label: 'States Covered' },
  ];

  companyFacts = [
    { label: 'License Grade',   val: "'A' Grade" },
    { label: 'Issued By',       val: 'Govt. of Tamilnadu' },
    { label: 'Sister Concerns', val: 'Kerala, KA, AP' },
    { label: 'Voltage Works',   val: 'HV · MV · LV' },
  ];

  paragraphs = [
    'We introduce ourselves as one of the leading electrical Contractors in Tamilnadu and we are in this field for over 10 years. We have been carrying out new electrical installation, additional installation and operation and maintenance works in many establishments throughout Tamilnadu and also in other states like Kerala, Karnataka, Andhra Pradesh.',
    'We hold \'A\' Grade contractor\'s License issued by the Tamilnadu state authorizing us to carry out all high voltage works, New as well as additions and alterations, up to a rating of 33,000 Volts, Medium & Low voltage Installations. We have also sister concerns and associates in other states through whom we can get works done in those states if necessary.',
    'We have a varied experience in the electrical field having done jobs in different type of industries, multistoried buildings, hospitals, star Hotels, Banks, Software complexes, etc. We are confident of taking up all kinds of works. We have appreciations of works and the quality of services given by us from all the Clients to whom we have done the works. We are entrusted with additional new works when once we do any works initially. This speaks about our quality of work and service.',
    'We have all the necessary testing instruments and all tools and tackles more than 5 sets and we have sufficient number of qualified and experienced engineers, senior electricians and technocrats whose help we could avail of for any special requirements needed.',
    'We have good relationship with the supply authorities like Electricity boards and other statutory Authorities like Electrical Inspectorate, Lift inspectorate etc. We are thorough with their requirements and so can be helpful in getting necessary clearance.',
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

  // Work showcase images — 6 featured photos in a bento grid
  showcaseImages = [
    { src: 'assets/work/Picture3.jpg',  span: 'lg:col-span-2 lg:row-span-2', label: 'HV Switchgear Installation' },
    { src: 'assets/work/Picture4.jpg',  span: '',                             label: 'Panel Wiring' },
    { src: 'assets/work/Picture5.jpg',  span: '',                             label: 'Site Inspection' },
    { src: 'assets/work/Picture33.jpg', span: '',                             label: 'Cable Laying' },
    { src: 'assets/work/Picture34.jpg', span: '',                             label: 'DB Installation' },
    { src: 'assets/work/Picture42.jpg', span: 'lg:col-span-2',               label: 'Industrial Complex' },
  ];
}
