import { Directive, ElementRef, AfterViewInit, Input, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements AfterViewInit {
  @Input() stagger = 0;
  private platformId = inject(PLATFORM_ID);

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const el = this.el.nativeElement as HTMLElement;

    // Check if element is already within or near the initial viewport (above the fold)
    // Prevents post-paint layout shift (CLS) for elements in the initial viewport
    const rect = el.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 800;
    const isAboveTheFold = rect.top < viewportHeight * 0.95;

    if (isAboveTheFold) {
      el.classList.add('visible');
      return;
    }

    el.classList.add('reveal');
    if (this.stagger) {
      el.style.transitionDelay = `${this.stagger}ms`;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('visible');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
  }
}
