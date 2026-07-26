import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { ApiService } from '../../services/api.service';

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

  onSubmit() {
    if (!this.form.name || !this.form.email || !this.form.phone || !this.form.projectType) return;

    this.status = 'sending';

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
        console.log('Quote submitted:', response);
        this._onSuccess();
      },
      error: (error) => {
        console.error('Quote error:', error);
        this.status = 'error';
        setTimeout(() => { this.status = 'idle'; }, 5000);
      }
    });
  }

  private _onSuccess() {
    this.status = 'success';
    setTimeout(() => {
      this.status = 'idle';
      this.form = { name: '', email: '', phone: '', company: '', projectType: '', siteType: '', quantity: '', budget: '', location: '', timeline: '', urgency: '', details: '' };
    }, 5000);
  }
}
