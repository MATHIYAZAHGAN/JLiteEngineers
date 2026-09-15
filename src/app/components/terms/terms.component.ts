import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent {
  constructor(
    private meta: Meta,
    private title: Title
  ) {
    this.title.setTitle('Terms & Conditions | JLITE Engineers');
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Terms and Conditions for JLITE Engineers electrical products and services. Read our terms of use, payment terms, and legal policies.' 
    });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
  }
}
