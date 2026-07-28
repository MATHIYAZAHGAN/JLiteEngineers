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
  selector: 'app-get-quote',
  standalone: true,
  imports: [CommonModule, FormsModule, ScrollRevealDirective],
  templateUrl: './get-quote.component.html',
})
export class GetQuoteComponent {

  form = {
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    siteType: '',
    quantity: '',
    budget: '',
    location: '',
    timeline: '',
    urgency: '',
    details: '',
  };

  status: 'idle' | 'sending' | 'success' | 'error' = 'idle';

  projectTypes = [
    'Electrical Installation',
    'Switchgear & Panels',
    'Lighting Solutions',
    'Power Distribution',
    'Industrial Wiring',
    'Consultancy / Design',
    'Maintenance Contract',
    'Other',
  ];

  siteTypes = ['Residential', 'Commercial', 'Industrial', 'Government / Institution', 'Other'];
  urgencyLevels = ['Standard (1–2 weeks)', 'Urgent (2–5 days)', 'Emergency (Within 24 hrs)'];
  budgetRanges = ['Below ₹50,000', '₹50,000 – ₹2,00,000', '₹2,00,000 – ₹10,00,000', 'Above ₹10,00,000', 'To be discussed'];

  constructor(private apiService: ApiService) {}

  async onSubmit() {
    if (!this.form.name || !this.form.email || !this.form.phone || !this.form.projectType) return;

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

      this.apiService.submitQuote({
        name: this.form.name,
        email: this.form.email,
        phone: this.form.phone,
        company: this.form.company || undefined,
        projectType: this.form.projectType,
        siteType: this.form.siteType || undefined,
        quantity: this.form.quantity || undefined,
        budget: this.form.budget || undefined,
        location: this.form.location || undefined,
        timeline: this.form.timeline || undefined,
        urgency: this.form.urgency || undefined,
        details: this.form.details || undefined
      }).subscribe({
        next: (response) => {
          clearTimeout(timeout);
          console.log('Quote submitted via backend:', response);
          this._onSuccess();
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
      const templateParams = {
        from_name: this.form.name,
        from_email: this.form.email,
        phone: this.form.phone,
        company: this.form.company || 'N/A',
        project_type: this.form.projectType,
        site_type: this.form.siteType || 'N/A',
        quantity: this.form.quantity || 'N/A',
        budget: this.form.budget || 'N/A',
        location: this.form.location || 'N/A',
        timeline: this.form.timeline || 'N/A',
        urgency: this.form.urgency || 'N/A',
        details: this.form.details || 'N/A',
        reply_to: this.form.email,
        subject: `Quote Request – ${this.form.projectType} | ${this.form.name}`
      };

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);
      console.log('Quote submitted via EmailJS');
      this._onSuccess();
    } catch (error) {
      console.error('EmailJS also failed:', error);
      this.status = 'error';
      setTimeout(() => { this.status = 'idle'; }, 5000);
    }
  }

  private _onSuccess() {
    this.status = 'success';
    setTimeout(() => {
      this.status = 'idle';
      this.form = { name: '', email: '', phone: '', company: '', projectType: '', siteType: '', quantity: '', budget: '', location: '', timeline: '', urgency: '', details: '' };
    }, 5000);
  }
}
