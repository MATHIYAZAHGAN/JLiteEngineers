import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-refund-policy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './refund-policy.component.html',
  styleUrls: ['./refund-policy.component.css']
})
export class RefundPolicyComponent {
  constructor(
    private meta: Meta,
    private title: Title
  ) {
    this.title.setTitle('Refund & Exchange Policy | JLITE Engineers');
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Refund and exchange policy for JLITE Engineers electrical products. Learn about our return process, timelines, and cancellation policy.' 
    });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
  }
}
