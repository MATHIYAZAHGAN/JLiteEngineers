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
      img: 'assets/Picture9.jpg',
    },
    {
      name: 'Anna University Guindy Campus',
      location: 'Guindy, Chennai',
      type: 'LT Works — Educational Institution',
      status: 'completed',
      icon: 'edu',
      img: 'assets/Picture10.jpg',
    },
    {
      name: 'Prison Quarters Puzhal',
      location: 'Puzhal, Chennai',
      type: 'Government / Residential Quarters',
      status: 'completed',
      icon: 'govt',
      img: 'assets/Picture11.jpg',
    },
    {
      name: 'TVS Vehicle Mobility Solution Pvt Ltd',
      location: 'Chennai',
      type: 'Automotive / Commercial',
      status: 'inprogress',
      icon: 'industry',
      img: 'assets/Picture12.jpg',
    },
    {
      name: 'Spendflo India Private Limited',
      location: 'Guindy, Chennai',
      type: 'IT / Software Complex',
      status: 'inprogress',
      icon: 'it',
      img: 'assets/Picture13.jpg',
    },
  ];

  galleryImages = Array.from({ length: 20 }, (_, i) => ({
    src: `assets/Picture${i + 14}.jpg`,
    label: `Project Site ${i + 1}`,
  }));

  lightboxSrc: string | null = null;

  openLightbox(src: string) { this.lightboxSrc = src; }
  closeLightbox() { this.lightboxSrc = null; }

  get completed() { return this.projects.filter(p => p.status === 'completed'); }
  get inProgress() { return this.projects.filter(p => p.status === 'inprogress'); }
}
