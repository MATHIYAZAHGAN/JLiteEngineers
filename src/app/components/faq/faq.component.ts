import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StructuredDataService } from '../../services/structured-data.service';

interface FAQ {
  question: string;
  answer: string;
  open: boolean;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html'
})
export class FaqComponent implements OnInit {
  faqs: FAQ[] = [
    {
      question: 'What products does JLITE Engineers manufacture?',
      answer: 'JLITE Engineers manufactures a comprehensive range of electrical components including MCB (Miniature Circuit Breakers), MCCB (Moulded Case Circuit Breakers), LED lighting solutions, switchgear, smart switches, and premium wiring accessories for professional electrical installations.',
      open: false
    },
    {
      question: 'Is JLITE a certified electrical components manufacturer?',
      answer: 'Yes, JLITE Engineers is an ISO certified manufacturer of electrical components. All our products meet international quality standards including ISI and CE certifications required for professional electrical installations.',
      open: false
    },
    {
      question: 'What services does JLITE Engineers provide?',
      answer: 'JLITE Engineers provides electrical contracting services, consultancy services for electrical projects, LED lighting design and installation, and premium electrical components supply for commercial and industrial applications across India.',
      open: false
    },
    {
      question: 'Where can I buy JLITE electrical products?',
      answer: 'JLITE electrical products are available through our authorized dealers across India. You can also contact us directly through our website at jliteengineers.com for bulk orders and professional installations.',
      open: false
    },
    {
      question: 'What makes JLITE MCBs different from other brands?',
      answer: 'JLITE MCBs feature premium build quality, advanced safety mechanisms, longer lifespan with 5-year warranty, and consistent performance. They are specifically designed for professional electrical contractors and meet stringent quality standards.',
      open: false
    },
    {
      question: 'Does JLITE Engineers offer electrical contracting services?',
      answer: 'Yes, we hold \'A\' Grade contractor\'s license issued by the Government of Tamilnadu, authorizing us to carry out high voltage works up to 33,000 Volts, including medium and low voltage installations across South India.',
      open: false
    },
    {
      question: 'What is the warranty period for JLITE products?',
      answer: 'JLITE products come with a comprehensive 5-year warranty covering manufacturing defects. We also provide 24-hour dispatch for warranty replacements and technical support.',
      open: false
    },
    {
      question: 'Which states does JLITE Engineers operate in?',
      answer: 'JLITE Engineers operates primarily in Tamilnadu and has strong presence in Kerala, Karnataka, and Andhra Pradesh. We have sister concerns and associates in other states for nationwide service.',
      open: false
    }
  ];

  constructor(private structuredDataService: StructuredDataService) {}

  ngOnInit(): void {
    // Inject FAQ structured data
    const faqSchema = this.structuredDataService.getFAQSchema();
    this.structuredDataService.injectSchemas([faqSchema]);
  }

  toggle(index: number): void {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
