import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent {
  constructor(
    private meta: Meta,
    private title: Title
  ) {
    this.title.setTitle('Privacy Policy | JLITE Engineers');
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Privacy Policy for JLITE Engineers. Learn how we collect, use, and protect your personal data in compliance with Indian data protection laws.' 
    });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
  }
}
