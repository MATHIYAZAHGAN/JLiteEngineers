import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ScrollRevealDirective],
  templateUrl: './contact.component.html',
})
export class ContactComponent {

  form = { name: '', email: '', subject: '', message: '' };
  status: 'idle' | 'sending' | 'success' | 'error' = 'idle';

  constructor(private apiService: ApiService) {}

  onSubmit() {
    if (!this.form.name || !this.form.email || !this.form.message) return;

    this.status = 'sending';
    
    this.apiService.submitContact({
      name: this.form.name,
      email: this.form.email,
      subject: this.form.subject,
      message: this.form.message
    }).subscribe({
      next: (response) => {
        console.log('Contact form submitted:', response);
        this.status = 'success';
        setTimeout(() => {
          this.status = 'idle';
          this.form = { name: '', email: '', subject: '', message: '' };
        }, 4000);
      },
      error: (error) => {
        console.error('Contact form error:', error);
        this.status = 'error';
        setTimeout(() => { this.status = 'idle'; }, 4000);
      }
    });
  }

  contactInfo = [
    { icon: 'company', label: 'Company',  value: "M/s. JLITE Electrical Engineer's and Contractor." },
    { icon: 'map',     label: 'Address',  value: 'No.338, Vijaya Nagar, 6th Main Road, Velachery, Chennai - 600042.' },
    { icon: 'phone',   label: 'Phone',    value: '+91 73581 78174' },
    { icon: 'mail',    label: 'Email',    value: 'jlite2025@gmail.com' },
    { icon: 'license', label: 'License',  value: 'Govt. EA Licensed Electrical Engineers & Contractors' },
  ];
}
