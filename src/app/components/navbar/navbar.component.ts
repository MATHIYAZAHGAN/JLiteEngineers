import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  cartService = inject(CartService);
  menuOpen = false;

  navLinks = [
    { label: 'About',        id: 'about' },
    { label: 'Products',     id: 'products' },
    { label: 'Contractors', id: 'electrical-contractors' },
    { label: 'Consultancy',  id: 'consultancy-services' },
    { label: 'Lighting',     id: 'light-pitcher' },
    { label: 'Policies',     id: 'legal-policies' },
    { label: 'Admin',        id: 'admin-portal' },
    { label: 'Contact',      id: 'contact' },
  ];

  toggleMenu() { this.menuOpen = !this.menuOpen; }
  closeMenu()  { this.menuOpen = false; }
}
