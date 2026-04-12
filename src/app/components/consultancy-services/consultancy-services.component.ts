import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-consultancy-services',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './consultancy-services.component.html',
})
export class ConsultancyServicesComponent {

  activeService: number | null = null;

  services = [
    {
      id: 1,
      icon: 'design',
      color: 'gold',
      title: 'Electrical Design & Engineering',
      short: 'Complete electrical system design from concept to detailed drawings.',
      details: [
        'Single Line Diagram (SLD) preparation',
        'Load calculation & demand analysis',
        'Cable sizing & voltage drop studies',
        'Short circuit & protection coordination',
        'AutoCAD & Revit MEP drawings',
      ],
    },
    {
      id: 2,
      icon: 'audit',
      color: 'blue',
      title: 'Energy Audit & Optimisation',
      short: 'Identify energy waste and reduce operational costs with data-driven audits.',
      details: [
        'Detailed energy consumption analysis',
        'Power quality monitoring & reporting',
        'Harmonic distortion assessment',
        'LED retrofit & lighting redesign',
        'ROI-based savings recommendations',
      ],
    },
    {
      id: 3,
      icon: 'safety',
      color: 'green',
      title: 'Safety & Compliance Consulting',
      short: 'Ensure full statutory compliance with IE Rules, NBC, and IS standards.',
      details: [
        'Electrical safety audits & inspections',
        'IE Rules & NBC compliance review',
        'Fire safety & emergency lighting',
        'Earthing & lightning protection design',
        'Statutory approval documentation',
      ],
    },
    {
      id: 4,
      icon: 'project',
      color: 'blue',
      title: 'Project Management',
      short: 'End-to-end project oversight from tendering to commissioning.',
      details: [
        'Tender preparation & BOQ estimation',
        'Vendor evaluation & procurement',
        'Site supervision & quality control',
        'Progress reporting & documentation',
        'Commissioning & handover support',
      ],
    },
    {
      id: 5,
      icon: 'smart',
      color: 'gold',
      title: 'Smart Building Consultancy',
      short: 'BMS, SCADA, and IoT integration for intelligent building management.',
      details: [
        'Building Management System (BMS) design',
        'SCADA & remote monitoring setup',
        'IoT sensor integration & dashboards',
        'Smart metering & sub-metering',
        'Automation & control panel design',
      ],
    },
    {
      id: 6,
      icon: 'liasion',
      color: 'green',
      title: 'Liaison & Approvals',
      short: 'Seamless handling of all statutory approvals and utility connections.',
      details: [
        'TNEB / BESCOM / KSEB connections',
        'Electrical Inspectorate approvals',
        'CEA & CEIG compliance',
        'Lift & escalator electrical clearances',
        'DG set & UPS statutory approvals',
      ],
    },
  ];

  process = [
    { step: '01', title: 'Site Assessment', desc: 'Thorough on-site evaluation of existing infrastructure and project requirements.' },
    { step: '02', title: 'Feasibility Study', desc: 'Technical and financial feasibility analysis with multiple solution options.' },
    { step: '03', title: 'Detailed Design', desc: 'Comprehensive engineering drawings, specifications, and BOQ preparation.' },
    { step: '04', title: 'Implementation', desc: 'Supervised execution with quality checkpoints and progress reporting.' },
    { step: '05', title: 'Commissioning', desc: 'Full testing, commissioning, and handover with as-built documentation.' },
  ];

  toggleService(id: number) {
    this.activeService = this.activeService === id ? null : id;
  }
}
