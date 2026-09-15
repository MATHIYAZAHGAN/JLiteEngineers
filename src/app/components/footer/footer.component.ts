import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  year = new Date().getFullYear();

  links = ['About', 'Features', 'Products', 'Contact'];

  footerProducts = ['MCBs & RCCBs', 'LED Lighting', 'Smart Switches', 'Distribution Boards', 'Armoured Cables', 'Surge Protectors'];

  policies = [
    { label: 'Privacy Policy', route: '/privacy-policy' },
    { label: 'Refund Policy', route: '/refund-policy' },
    { label: 'Shipping Policy', route: '/shipping-policy' },
    { label: 'Terms of Service', route: '/terms-of-service' },
    { label: 'Contact', route: '/contact' }
  ];

  socials = [
    { icon: 'linkedin', href: '#', label: 'LinkedIn' },
    { icon: 'twitter',  href: '#', label: 'Twitter' },
    { icon: 'youtube',  href: '#', label: 'YouTube' },
  ];
}
