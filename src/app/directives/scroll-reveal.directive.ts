import { Directive, ElementRef, AfterViewInit, Input, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements AfterViewInit {
  @Input() stagger = 0;
  private platformId = inject(PLATFORM_ID);
  private static sharedObserver: IntersectionObserver | null = null;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const el = this.el.nativeElement as HTMLElement;
    el.classList.add('reveal');
    if (this.stagger) {
      el.style.transitionDelay = `${this.stagger}ms`;
    }

    if (!ScrollRevealDirective.sharedObserver) {
      ScrollRevealDirective.sharedObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target as HTMLElement;
              target.classList.add('visible');
              ScrollRevealDirective.sharedObserver?.unobserve(target);
            }
          });
        },
        { threshold: 0.05, rootMargin: '80px 0px' }
      );
    }

    ScrollRevealDirective.sharedObserver.observe(el);
  }
}
