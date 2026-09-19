import { Component, ViewChild, ElementRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { CmsService, HeroData } from '../../services/cms.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './hero.component.html',
})
export class HeroComponent implements OnInit {
  private cmsService = inject(CmsService);

  heroData = signal<HeroData | null>(null);

  @ViewChild('panelImg') panelImg!: ElementRef<HTMLImageElement>;

  ngOnInit(): void {
    this.cmsService.getHero().subscribe({
      next: (data) => this.heroData.set(data)
    });
  }

  onPanelHover(event: MouseEvent) {
    const wrap = event.currentTarget as HTMLElement;
    const img = wrap.querySelector('.hero-panel-img') as HTMLElement;
    if (!img) return;
    img.style.animation = 'none';
    img.offsetHeight;
    img.style.animation = 'panel-spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
  }
}
