import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ScrollRevealDirective],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  form = { name: '', email: '', subject: '', message: '' };
  submitted = false;

  onSubmit() {
    if (this.form.name && this.form.email && this.form.message) {
      this.submitted = true;
      setTimeout(() => {
        this.submitted = false;
        this.form = { name: '', email: '', subject: '', message: '' };
      }, 3000);
    }
  }

  contactInfo = [
    { icon: 'company', label: 'Company',  value: "M/s. JLITE Electrical Engineer's and Contractor." },
    { icon: 'map',     label: 'Address',  value: 'No.338, Vijaya Nagar, 6th Main Road, Velachery, Chennai - 600042.' },
    { icon: 'phone',   label: 'Phone',    value: '+91 73581 78174' },
    { icon: 'mail',    label: 'Email',    value: 'jlite2025@gmail.com' },
    { icon: 'license', label: 'License',  value: 'Govt. EA Licensed Electrical Engineers & Contractors' },
  ];
}
