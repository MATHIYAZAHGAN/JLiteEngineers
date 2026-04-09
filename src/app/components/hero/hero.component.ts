import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  stats = [
    { value: '500+', label: 'Products' },
    { value: '15kV', label: 'Max Rating' },
    { value: '50K+', label: 'Clients' },
  ];

  @ViewChild('panelImg') panelImg!: ElementRef<HTMLImageElement>;

  onPanelHover(event: MouseEvent) {
    const wrap = event.currentTarget as HTMLElement;
    const img = wrap.querySelector('.hero-panel-img') as HTMLElement;
    if (!img) return;
    // Reset animation by removing and re-adding it
    img.style.animation = 'none';
    img.offsetHeight; // force reflow
    img.style.animation = 'panel-spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
  }
}
