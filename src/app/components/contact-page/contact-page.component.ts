import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, ContactComponent],
  template: `<app-contact />`,
})
export class ContactPageComponent {
  constructor(
    private meta: Meta,
    private title: Title
  ) {
    this.title.setTitle('Contact Us | JLITE Engineers');
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Contact JLITE Engineers for electrical solutions. Get in touch for MCB, LED lighting, switchgear inquiries. Call +91 73581 78174 or email us.' 
    });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
  }
}
