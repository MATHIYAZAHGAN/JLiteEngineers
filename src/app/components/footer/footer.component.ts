import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  year = new Date().getFullYear();

  links = ['About', 'Features', 'Products', 'Contact'];

  footerProducts = ['MCBs & RCCBs', 'LED Lighting', 'Smart Switches', 'Distribution Boards', 'Armoured Cables', 'Surge Protectors'];

  socials = [
    { icon: 'linkedin', href: '#', label: 'LinkedIn' },
    { icon: 'twitter',  href: '#', label: 'Twitter' },
    { icon: 'youtube',  href: '#', label: 'YouTube' },
  ];
}
