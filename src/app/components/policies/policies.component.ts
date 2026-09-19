import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyService, PolicyModel } from '../../services/policy.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-policies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './policies.component.html'
})
export class PoliciesComponent implements OnInit {
  private policyService = inject(PolicyService);
  private seoService = inject(SeoService);

  activeTab = signal<string>('privacy-policy');
  currentPolicy = signal<PolicyModel | null>(null);
  isLoading = signal<boolean>(false);

  policyTabs = [
    { type: 'privacy-policy', label: 'Privacy Policy', icon: 'shield-check' },
    { type: 'terms-and-conditions', label: 'Terms & Conditions', icon: 'document-text' },
    { type: 'refund-cancellation', label: 'Refund & Cancellation', icon: 'refresh' },
    { type: 'shipping-delivery', label: 'Shipping & Delivery', icon: 'truck' }
  ];

  ngOnInit(): void {
    this.loadPolicy(this.activeTab());
  }

  setTab(type: string): void {
    this.activeTab.set(type);
    this.loadPolicy(type);
  }

  loadPolicy(type: string): void {
    this.isLoading.set(true);
    this.policyService.getPolicy(type).subscribe({
      next: (policy) => {
        this.currentPolicy.set(policy);
        this.isLoading.set(false);
        this.seoService.setTitle(`${policy.title} | JLite Engineers Compliance`);
      },
      error: () => {
        // Fallback default policy content
        this.currentPolicy.set({
          id: '1',
          type,
          title: this.policyTabs.find(t => t.type === type)?.label || 'Policy Document',
          contentMarkdown: `### ${type.toUpperCase()} - JLite Engineers\nOfficial compliance document for JLite Engineers Electrical Solutions & Contracting.`,
          lastUpdated: new Date().toISOString()
        });
        this.isLoading.set(false);
      }
    });
  }
}
