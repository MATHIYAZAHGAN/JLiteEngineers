import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-shipping-policy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shipping-policy.component.html',
  styleUrls: ['./shipping-policy.component.css']
})
export class ShippingPolicyComponent {
  constructor(
    private meta: Meta,
    private title: Title
  ) {
    this.title.setTitle('Shipping & Delivery Policy | JLITE Engineers');
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Shipping and delivery policy for JLITE Engineers. Learn about our delivery timelines, shipping partners, and coverage areas across India.' 
    });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
  }
}
