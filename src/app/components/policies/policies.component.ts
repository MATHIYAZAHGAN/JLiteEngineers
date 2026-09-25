import { Component, inject, signal, OnInit, OnDestroy, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyService, PolicyModel } from '../../services/policy.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-policies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './policies.component.html'
})
export class PoliciesComponent implements OnInit, OnDestroy {
  policyService = inject(PolicyService);
  private seoService = inject(SeoService);

  activeTab = this.policyService.activePolicyTab;
  isOpen = this.policyService.isPolicyOpen;
  currentPolicy = signal<PolicyModel | null>(null);
  isLoading = signal<boolean>(false);
  private hashListener: any;

  policyTabs = [
    { type: 'privacy-policy', label: 'Privacy Policy', icon: 'shield-check' },
    { type: 'terms-and-conditions', label: 'Terms & Conditions', icon: 'document-text' },
    { type: 'refund-cancellation', label: 'Refund & Cancellation', icon: 'refresh' },
    { type: 'shipping-delivery', label: 'Shipping & Delivery', icon: 'truck' }
  ];

  constructor() {
    // Automatically reload content whenever activePolicyTab changes
    effect(() => {
      const currentTab = this.policyService.activePolicyTab();
      this.loadPolicy(currentTab);
    }, { allowSignalWrites: true });
  }

  ngOnInit(): void {
    // Handle initial route/hash on direct page load
    this.checkCurrentHash();

    // Listen for hash changes in the URL (e.g. back/forward or deep links)
    this.hashListener = () => this.checkCurrentHash();
    window.addEventListener('hashchange', this.hashListener);
  }

  ngOnDestroy(): void {
    if (this.hashListener) {
      window.removeEventListener('hashchange', this.hashListener);
    }
  }

  closePolicy(): void {
    this.policyService.closePolicy();
    this.restoreDefaultTitle();
  }

  private checkCurrentHash(): void {
    if (typeof window !== 'undefined' && window.location.hash) {
      const rawHash = window.location.hash.replace('#', '').trim().toLowerCase();
      const policyKeys = [
        'privacy-policy', 'privacy', 'legal-policies',
        'terms-and-conditions', 'terms-of-service', 'terms',
        'refund-cancellation', 'refunds', 'refund',
        'shipping-delivery', 'shipping', 'delivery'
      ];

      if (policyKeys.includes(rawHash)) {
        const targetType = this.policyService.normalizePolicyType(rawHash);
        this.policyService.activePolicyTab.set(targetType);
        this.policyService.isPolicyOpen.set(true);
        setTimeout(() => {
          this.policyService.scrollToPolicy(targetType);
        }, 120);
      }
    }
  }

  setTab(type: string): void {
    this.policyService.activePolicyTab.set(type);
    try {
      if (window.location.hash !== '#' + type) {
        history.replaceState(null, '', '#' + type);
      }
    } catch (_) {}
  }

  loadPolicy(type: string): void {
    this.isLoading.set(true);
    this.policyService.getPolicy(type).subscribe({
      next: (policy) => {
        this.currentPolicy.set(policy);
        this.isLoading.set(false);
        // Only update the page title when the policy panel is actually open
        if (this.isOpen()) {
          this.seoService.setTitle(`${policy.title} | JLite Engineers Compliance`);
        }
      },
      error: () => {
        // High-standard fallback policy content
        const fallback = this.policyService.getDefaultPolicy(type);
        this.currentPolicy.set(fallback);
        this.isLoading.set(false);
        // Only update the page title when the policy panel is actually open
        if (this.isOpen()) {
          this.seoService.setTitle(`${fallback.title} | JLite Engineers Compliance`);
        }
      }
    });
  }

  restoreDefaultTitle(): void {
    this.seoService.setTitle('JLite Engineers | Govt. A-Grade Electrical Contractors & Switchgear Suppliers');
  }
}
