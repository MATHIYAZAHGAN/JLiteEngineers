import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  menuOpen = false;

  navLinks = [
    { label: 'About',        id: 'about' },
    { label: 'Features',     id: 'features' },
    { label: 'Products',     id: 'products' },
    { label: 'Contractors',  id: 'electrical-contractors' },
    { label: 'Consultancy',  id: 'consultancy-services' },
    { label: 'Lighting',     id: 'light-pitcher' },
    { label: 'Contact',      id: 'contact' },
  ];

  toggleMenu() { this.menuOpen = !this.menuOpen; }
  closeMenu()  { this.menuOpen = false; }
}
