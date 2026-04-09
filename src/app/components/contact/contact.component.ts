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
    { icon: 'mail',  label: 'Email',        value: 'sales@jjelectronics.com' },
    { icon: 'phone', label: 'Phone',        value: '+1 (800) 567-8900' },
    { icon: 'map',   label: 'Address',      value: '123 Industrial Park, San Francisco, CA' },
    { icon: 'clock', label: 'Working Hours', value: 'Mon–Fri, 8am–6pm PST' },
  ];
}
