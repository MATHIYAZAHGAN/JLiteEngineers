import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { ApiService } from '../../services/api.service';
import emailjs from '@emailjs/browser';

// EmailJS Configuration - Sends to jlite@jliteengineers.com
const EMAILJS_SERVICE_ID = 'service_1t9r75b';
const EMAILJS_TEMPLATE_ID = 'template_kkwxyy7';
const EMAILJS_PUBLIC_KEY = '08x80TnEtJ1WxAle_';

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

  async onSubmit() {
    if (!this.form.name || !this.form.email || !this.form.message) return;

    this.status = 'sending';
    
    try {
      // Try backend API first
      await this.sendViaBackend();
    } catch (backendError) {
      console.warn('Backend failed, using EmailJS fallback:', backendError);
      // Fallback to EmailJS if backend fails
      await this.sendViaEmailJS();
    }
  }

  private sendViaBackend(): Promise<void> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Backend timeout'));
      }, 10000); // 10 second timeout

      this.apiService.submitContact({
        name: this.form.name,
        email: this.form.email,
        subject: this.form.subject,
        message: this.form.message
      }).subscribe({
        next: (response) => {
          clearTimeout(timeout);
          console.log('Contact form submitted via backend:', response);
          this.handleSuccess();
          resolve();
        },
        error: (error) => {
          clearTimeout(timeout);
          reject(error);
        }
      });
    });
  }

  private async sendViaEmailJS(): Promise<void> {
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: this.form.name,
          from_email: this.form.email,
          subject: this.form.subject || 'New Enquiry from JLite Website',
          message: this.form.message,
          reply_to: this.form.email
        },
        EMAILJS_PUBLIC_KEY
      );
      console.log('Contact form submitted via EmailJS');
      this.handleSuccess();
    } catch (error) {
      console.error('EmailJS also failed:', error);
      this.status = 'error';
      setTimeout(() => { this.status = 'idle'; }, 4000);
    }
  }

  private handleSuccess() {
    this.status = 'success';
    setTimeout(() => {
      this.status = 'idle';
      this.form = { name: '', email: '', subject: '', message: '' };
    }, 4000);
  }

  contactInfo = [
    { icon: 'company', label: 'Company',  value: "M/s. JLITE Electrical Engineer's and Contractor." },
    { icon: 'map',     label: 'Address',  value: 'No.338, Vijaya Nagar, 6th Main Road, Velachery, Chennai - 600042.' },
    { icon: 'phone',   label: 'Phone',    value: '+91 73581 78174' },
    { icon: 'mail',    label: 'Email',    value: 'jlite@jliteengineers.com' },
    { icon: 'license', label: 'License',  value: 'Govt. EA Licensed Electrical Engineers & Contractors' },
  ];
}
