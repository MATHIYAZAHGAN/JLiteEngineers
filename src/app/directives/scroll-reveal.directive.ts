import { Directive, ElementRef, AfterViewInit, Input } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements AfterViewInit {
  @Input() stagger = 0;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const el = this.el.nativeElement as HTMLElement;
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
