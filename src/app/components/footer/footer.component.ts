import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyService } from '../../services/policy.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  policyService = inject(PolicyService);
  year = new Date().getFullYear();

  links = ['About', 'Features', 'Products', 'Contact'];

  footerProducts = ['MCBs & RCCBs', 'LED Lighting', 'Smart Switches', 'Distribution Boards', 'Armoured Cables', 'Surge Protectors'];

  socials = [
    { icon: 'linkedin', href: '#', label: 'LinkedIn' },
    { icon: 'twitter',  href: '#', label: 'Twitter' },
    { icon: 'youtube',  href: '#', label: 'YouTube' },
  ];

  scrollToPolicy(type: string, event: Event): void {
    event.preventDefault();
    this.policyService.scrollToPolicy(type);
  }
}
