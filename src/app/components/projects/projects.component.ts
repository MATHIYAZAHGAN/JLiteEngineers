import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent {

  projects = [
    {
      name: 'Chennai Mettex Lab Pvt Ltd',
      location: 'Guindy, Chennai',
      type: 'Industrial / Laboratory',
      status: 'completed',
      icon: 'lab',
      img: 'assets/work/Picture3.jpg',
    },
    {
      name: 'Anna University Guindy Campus',
      location: 'Guindy, Chennai',
      type: 'LT Works — Educational Institution',
      status: 'completed',
      icon: 'edu',
      img: 'assets/work/Picture33.jpg',
    },
    {
      name: 'Prison Quarters Puzhal',
      location: 'Puzhal, Chennai',
      type: 'Government / Residential Quarters',
      status: 'completed',
      icon: 'govt',
      img: 'assets/work/Picture34.jpg',
    },
    {
      name: 'TVS Vehicle Mobility Solution Pvt Ltd',
      location: 'Chennai',
      type: 'Automotive / Commercial',
      status: 'inprogress',
      icon: 'industry',
      img: 'assets/work/Picture37.jpg',
    },
    {
      name: 'Spendflo India Private Limited',
      location: 'Guindy, Chennai',
      type: 'IT / Software Complex',
      status: 'inprogress',
      icon: 'it',
      img: 'assets/work/Picture38.jpg',
    },
  ];

  galleryImages = [
    { src: 'assets/work/Picture3.jpg',   label: 'Electrical Panel Installation' },
    { src: 'assets/work/Picture33.jpg',  label: 'HV Substation Works' },
    { src: 'assets/work/Picture34.jpg',  label: 'Cable Laying & Jointing' },
    { src: 'assets/work/Picture37.jpg',  label: 'Distribution Board Setup' },
    { src: 'assets/work/Picture38.jpg',  label: 'Industrial Wiring Works' },
    { src: 'assets/work/Picture4.jpg',   label: 'LT Panel Commissioning' },
    { src: 'assets/work/Picture41.png',  label: 'Switchgear Installation' },
    { src: 'assets/work/Picture42.jpg',  label: 'Site Electrical Works' },
    { src: 'assets/work/Picture43.jpg',  label: 'Transformer Erection' },
    { src: 'assets/work/Picture5.jpg',   label: 'MV Cable Termination' },
  ];

  lightboxSrc: string | null = null;

  openLightbox(src: string) { this.lightboxSrc = src; }
  closeLightbox() { this.lightboxSrc = null; }

  get completed() { return this.projects.filter(p => p.status === 'completed'); }
  get inProgress() { return this.projects.filter(p => p.status === 'inprogress'); }
}
