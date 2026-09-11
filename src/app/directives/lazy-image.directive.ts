import { Directive, ElementRef, Input, OnInit, Renderer2, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: 'img[appLazyImage]',
  standalone: true
})
export class LazyImageDirective implements OnInit {
  @Input() src!: string;
  @Input() alt!: string;
  @Input() loading: 'lazy' | 'eager' = 'lazy';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const img = this.el.nativeElement as HTMLImageElement;
      
      // Set loading attribute
      this.renderer.setAttribute(img, 'loading', this.loading);
      
      // Set decoding attribute for better performance
      this.renderer.setAttribute(img, 'decoding', 'async');
      
      // Set alt attribute for accessibility and SEO
      if (this.alt) {
        this.renderer.setAttribute(img, 'alt', this.alt);
      }

      // Use Intersection Observer for lazy loading on older browsers
      if ('IntersectionObserver' in window && this.loading === 'lazy') {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.loadImage(img);
              observer.unobserve(img);
            }
          });
        }, {
          rootMargin: '50px'
        });
        
        observer.observe(img);
      } else {
        this.loadImage(img);
      }
    } else {
      // Server-side: just set the src
      const img = this.el.nativeElement as HTMLImageElement;
      this.renderer.setAttribute(img, 'src', this.src);
      if (this.alt) {
        this.renderer.setAttribute(img, 'alt', this.alt);
      }
    }
  }

  private loadImage(img: HTMLImageElement): void {
    if (this.src) {
      this.renderer.setAttribute(img, 'src', this.src);
    }
  }
}
