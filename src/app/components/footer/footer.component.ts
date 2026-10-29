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
    { icon: 'instagram', href: 'https://www.instagram.com/jlite2026/reels/', label: 'Instagram', hoverColor: 'from-pink-500 via-rose-500 to-amber-500' },
    { icon: 'facebook', href: 'https://www.facebook.com/profile.php?id=61593258419189#', label: 'Facebook', hoverColor: 'from-blue-600 to-blue-700' },
    { icon: 'whatsapp', href: 'https://wa.me/917358178174?text=Hello%20JLite%20Engineers%2C%20I%20would%20like%20to%20enquire%20about%20your%20electrical%20products%20and%20contracting%20services.', label: 'WhatsApp', hoverColor: 'from-emerald-500 to-green-600' },
    { icon: 'linkedin', href: '#', label: 'LinkedIn', hoverColor: 'from-blue-700 to-sky-700' },
    { icon: 'youtube', href: '#', label: 'YouTube', hoverColor: 'from-red-600 to-rose-700' },
  ];

  scrollToPolicy(type: string, event: Event): void {
    event.preventDefault();
    this.policyService.scrollToPolicy(type);
  }
}
