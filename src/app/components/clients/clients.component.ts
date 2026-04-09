import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './clients.component.html',
})
export class ClientsComponent {

  clients = [
    { name: 'Tamil Nadu Electricity Board', abbr: 'TNEB', category: 'Government' },
    { name: 'BHEL Trichy', abbr: 'BHEL', category: 'Public Sector' },
    { name: 'TIDCO', abbr: 'TIDCO', category: 'Government' },
    { name: 'SIPCOT Industrial Complex', abbr: 'SIPCOT', category: 'Industrial' },
    { name: 'Apollo Hospitals', abbr: 'AH', category: 'Healthcare' },
    { name: 'Fortis Healthcare', abbr: 'FH', category: 'Healthcare' },
    { name: 'ITC Hotels', abbr: 'ITC', category: 'Hospitality' },
    { name: 'Taj Group of Hotels', abbr: 'TAJ', category: 'Hospitality' },
    { name: 'Indian Bank', abbr: 'IB', category: 'Banking' },
    { name: 'Canara Bank', abbr: 'CB', category: 'Banking' },
    { name: 'Infosys Campus', abbr: 'INFY', category: 'IT / Software' },
    { name: 'Wipro Technologies', abbr: 'WIP', category: 'IT / Software' },
  ];

  consultants = [
    { name: 'M/s. Edifice Consultants', abbr: 'EC', type: 'Structural & MEP' },
    { name: 'M/s. Spectrum Architects', abbr: 'SA', type: 'Architecture' },
    { name: 'M/s. Integrated Design Group', abbr: 'IDG', type: 'MEP Consulting' },
    { name: 'M/s. Techno Consultants', abbr: 'TC', type: 'Electrical Consulting' },
    { name: 'M/s. Design Arc', abbr: 'DA', type: 'Architecture' },
    { name: 'M/s. Planners & Engineers', abbr: 'PE', type: 'Project Management' },
  ];

  categories = ['All', 'Government', 'Public Sector', 'Industrial', 'Healthcare', 'Hospitality', 'Banking', 'IT / Software'];
  activeCategory = 'All';

  get filteredClients() {
    if (this.activeCategory === 'All') return this.clients;
    return this.clients.filter(c => c.category === this.activeCategory);
  }

  setCategory(cat: string) {
    this.activeCategory = cat;
  }

  avatarColor(index: number): string {
    const colors = [
      'from-blue-500 to-cyan-500',
      'from-sky-500 to-blue-600',
      'from-cyan-500 to-teal-500',
      'from-blue-600 to-indigo-600',
      'from-indigo-500 to-blue-500',
      'from-teal-500 to-cyan-600',
    ];
    return colors[index % colors.length];
  }
}
