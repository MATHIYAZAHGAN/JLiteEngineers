import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface PolicyModel {
  id: string;
  type: string;
  title: string;
  contentMarkdown: string;
  lastUpdated: string;
}

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  private http = inject(HttpClient);

  // Active policy tab signal accessible across the application
  activePolicyTab = signal<string>('privacy-policy');

  // Initially hide privacy/legal section until user clicks or deep-links
  isPolicyOpen = signal<boolean>(false);

  getPolicy(type: string): Observable<PolicyModel> {
    return this.http.get<PolicyModel>(`${environment.apiUrl}/policies/${type}`);
  }

  getAllPolicies(): Observable<PolicyModel[]> {
    return this.http.get<PolicyModel[]>(`${environment.apiUrl}/policies/all`);
  }

  /**
   * Dynamically reveals the Legal & Compliance / Privacy Policy section,
   * ensures the corresponding policy tab is activated, and smoothly scrolls to it.
   */
  scrollToPolicy(policyType: string = 'privacy-policy'): void {
    const normalized = this.normalizePolicyType(policyType);
    this.activePolicyTab.set(normalized);
    this.isPolicyOpen.set(true); // Dynamically reveal section

    // Update browser URL hash for direct bookmarking/sharing
    try {
      if (window.location.hash !== '#' + normalized) {
        history.pushState(null, '', '#' + normalized);
      }
    } catch (_) {}

    // Smooth scroll with offset for fixed 72px top navigation header
    setTimeout(() => {
      const el = document.getElementById('legal-policies') || 
                 document.getElementById(normalized) || 
                 document.getElementById('privacy-policy');

      if (el) {
        const navOffset = 80;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  }

  /**
   * Closes / collapses the dynamic policy section
   */
  closePolicy(): void {
    this.isPolicyOpen.set(false);
    try {
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname);
      }
    } catch (_) {}
  }

  normalizePolicyType(type: string): string {
    const clean = (type || '').replace('#', '').trim().toLowerCase();
    if (clean === 'privacy' || clean === 'privacy-policy' || clean === 'privacy_policy') {
      return 'privacy-policy';
    }
    if (clean === 'terms' || clean === 'terms-and-conditions' || clean === 'terms-of-service' || clean === 'terms_of_service') {
      return 'terms-and-conditions';
    }
    if (clean === 'refund' || clean === 'refund-cancellation' || clean === 'refunds' || clean === 'cancellation') {
      return 'refund-cancellation';
    }
    if (clean === 'shipping' || clean === 'shipping-delivery' || clean === 'delivery') {
      return 'shipping-delivery';
    }
    return 'privacy-policy';
  }

  getDefaultPolicy(type: string): PolicyModel {
    const normalized = this.normalizePolicyType(type);
    const dateStr = '2026-03-15T00:00:00.000Z';

    switch (normalized) {
      case 'privacy-policy':
        return {
          id: 'pol-privacy',
          type: 'privacy-policy',
          title: 'Privacy Policy & Data Protection',
          lastUpdated: dateStr,
          contentMarkdown: `1. Introduction & Scope
JLite Engineers Pvt. Ltd. ("we", "us", or "our"), operating under Government of Tamil Nadu Electrical Licensing Board A-Grade License (ESA No: 33kV-IND), is dedicated to protecting your privacy and confidential data. This Privacy Policy governs the collection, processing, and safeguarding of information gathered via our e-commerce platform, engineering inquiry portal, and related services in accordance with the Information Technology Act, 2000, the Digital Personal Data Protection (DPDP) Act, 2023, and Reserve Bank of India (RBI) payment guidelines.

2. Information We Collect
• Personal Identification: Name, official email address, mobile phone number, and physical billing/shipping addresses.
• Commercial & B2B Credentials: Company legal name, Goods and Services Tax Identification Number (GSTIN), Permanent Account Number (PAN), and purchase authorization credentials for commercial quotations.
• Order & Quotation Data: Detailed engineering specifications, bills of quantities, delivery requirements, and purchase history.
• Device & Usage Telemetry: IP address, browser type, operating system, and anonymous interaction metrics to enhance application performance.

3. Payment Gateway & Financial Security
All online financial transactions are encrypted and processed through RBI-authorized payment aggregators (including PhonePe Payment Gateway). 
• JLite Engineers NEVER captures, stores, or logs card numbers, CVVs, expiry dates, net-banking credentials, or UPI PINs on its servers.
• Payment processing adheres to PCI-DSS Level 1 compliance standards.

4. How We Use Collected Data
• Fulfilling product orders, executing insured logistics, and generating mandatory GST tax invoices.
• Coordinating on-site engineering assessments, high-voltage transformer maintenance, and electrical turnkey contracting.
• Facilitating real-time SMS/Email order status notifications and critical safety advisories.
• Preventing fraudulent orders and complying with statutory audit mandates.

5. Third-Party Sharing & Safeguards
We do not sell, rent, or trade your personal data. Information is strictly shared on a need-to-know basis with:
• Certified courier and heavy-freight transport partners solely for shipment transit.
• Authorized banking and payment gateways for instant transaction clearance.
• Law enforcement or statutory authorities only when officially mandated by applicable Indian law.

6. Data Retention & User Rights
Your personal information is retained only as long as necessary for business, tax, and legal obligations. You have the right to request access to, correction of, or deletion of your personal records by contacting our Compliance Desk.

7. Grievance Officer & Contact
In compliance with the Information Technology Act 2000 and DPDP Act 2023:
Grievance Officer: Legal & Compliance Desk, JLite Engineers Pvt. Ltd.
Address: No.338, Vijaya Nagar, 6th Main Road, Velachery, Chennai – 600042, Tamil Nadu, India.
Email: jlite@jliteengineers.com | Tel: +91 73581 78174`
        };

      case 'terms-and-conditions':
        return {
          id: 'pol-terms',
          type: 'terms-and-conditions',
          title: 'Terms & Conditions of Service',
          lastUpdated: dateStr,
          contentMarkdown: `1. Acceptance of Terms
By accessing the JLite Engineers website (jliteengineers.com), purchasing industrial electrical switchgear, or requesting engineering contracting services, you acknowledge that you have read, understood, and agreed to these Terms & Conditions.

2. Company Status & Engineering Authority
JLite Engineers Pvt. Ltd. is an authorized Govt. A-Grade Electrical Contractor certified for up to 33kV high-voltage (HT) and medium/low-voltage (LT) infrastructure projects, electrical design, statutory CEIG approvals, and equipment supply.

3. Pricing, Invoicing & GST
• All displayed prices are quoted in Indian Rupees (INR) and are subject to statutory Goods & Services Tax (GST) as applicable under Indian law.
• Price quotations for turnkey projects, custom distribution boards, and heavy cables remain valid for 15 calendar days from the quotation date.
• We reserve the right to correct pricing errors caused by inadvertent typographical inaccuracies.

4. Payment Terms
• Retail & Standard Catalog Orders: 100% advance payment via PhonePe, authorized credit/debit cards, Net Banking, or verified UPI.
• Commercial & Turnkey Contracting: Milestone-based payments specified in formal engineering contracts.

5. Technical Safety & Installation Disclaimer
High-voltage electrical switchgears, transformers, MCBs, MCCBs, and distribution panels must be installed strictly by certified A-Grade licensed electricians in accordance with IS/IEC standards and National Electrical Code (NEC) guidelines. JLite Engineers is not liable for hazards resulting from unauthorized modifications or amateur installations.

6. Intellectual Property
All logos, technical drawings, CAD layouts, custom component schematics, and branding displayed on this platform are the exclusive intellectual property of JLite Engineers Pvt. Ltd. and are protected under Indian Copyright and Trademark law.

7. Governing Law & Dispute Resolution
These Terms are governed by and construed under the laws of the Republic of India. Any legal dispute or proceeding arising out of or related to our products or services shall be subject to the exclusive jurisdiction of the competent courts in Chennai, Tamil Nadu.`
        };

      case 'refund-cancellation':
        return {
          id: 'pol-refund',
          type: 'refund-cancellation',
          title: 'Refund & Cancellation Policy',
          lastUpdated: dateStr,
          contentMarkdown: `1. Order Cancellation Policy
• Standard Catalog Products: Orders may be cancelled within 4 hours of payment or prior to warehouse dispatch (whichever occurs first) via the user account portal or by notifying customer support.
• Custom Engineered Products: Custom-built LT/HT panels, tailor-made capacitor banks, busbar trunking, or custom-cut armoured cables CANNOT be cancelled once manufacturing or cable slicing has commenced.

2. Return & Replacement Eligibility
We accept return or replacement requests within 7 calendar days from the date of documented delivery under the following circumstances:
• The product was damaged or altered in transit.
• The item received differs significantly in specification or model number from the placed order.
• A manufacturing defect is identified upon installation by a certified technician.

3. Return Procedure & Evidence
• To initiate a return, notify support at jlite@jliteengineers.com with the Tax Invoice number and detailed photos or an unboxing video demonstrating the issue.
• Products must be returned in their original packaging, including all terminal covers, manuals, calibration certificates, and manufacturer seals intact.

4. Inspection & Quality Assurance
Returned items undergo technical inspection by JLite quality control engineers at our Velachery facility within 48 business hours of receipt.

5. Refund Processing Timeline
Upon inspection approval:
• Online Payments (PhonePe/UPI/Cards): Refund is initiated within 2 business days and credited to the original payment source within 5 to 7 business days per banking settlement schedules.
• Commercial NEFT/RTGS: Direct bank transfer to the purchaser's verified commercial account within 3 business days.`
        };

      case 'shipping-delivery':
        return {
          id: 'pol-shipping',
          type: 'shipping-delivery',
          title: 'Shipping & Delivery Policy',
          lastUpdated: dateStr,
          contentMarkdown: `1. Pan-India Delivery Coverage
JLite Engineers delivers certified electrical components, switchgears, and industrial panels across all major industrial belts, metropolitan cities, and regional commercial centers across India.

2. Dispatch Timelines
• Standard In-Stock Products (MCBs, RCCBs, Contactors, LED Luminaires, Distribution Boards): Dispatched from our Chennai fulfillment hub within 24 to 48 business hours.
• Heavy Industrial Equipment & Custom Switchboards: Fabricated, factory-acceptance-tested, and dispatched in accordance with agreed contract manufacturing lead times (typically 7 to 14 business days).

3. Logistics Partners & Transit Insurance
All consignments are transported through top-tier logistics carriers (including Blue Dart, V-Trans, Safechem, and regional express freight partners). Every shipment carries comprehensive transit insurance covering loss or damage until physical receipt.

4. Tracking & Delivery Notifications
Upon dispatch, a confirmed Air Waybill (AWB) or consignment note number is shared with the customer via SMS and email, allowing real-time tracking from dispatch to doorstep delivery.

5. Delivery Verification & Consignee Responsibility
• Customers must examine the outer container seal for any signs of tampering before signing the delivery proof.
• In case of visible exterior damage, consignees should note "Received Damaged" on the carrier acknowledgment slip and inform JLite support within 24 hours.`
        };

      default:
        return this.getDefaultPolicy('privacy-policy');
    }
  }
}
