import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartDrawerComponent } from './components/cart-drawer/cart-drawer.component';
import { MobileNavComponent } from './components/mobile-nav/mobile-nav.component';
import { AuthModalComponent } from './components/auth-modal/auth-modal.component';
import { SeoService } from './services/seo.service';
import { KeepAliveService } from './services/keep-alive.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    CartDrawerComponent,
    MobileNavComponent,
    AuthModalComponent
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private seoService = inject(SeoService);
  private keepAliveService = inject(KeepAliveService);
  public authService = inject(AuthService);

  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      document.body.classList.remove('modal-open');
    }
    this.keepAliveService.initKeepAlive();
    this.authService.initializeAuth();
    this.seoService.initDynamicSeoListener();
  }
}
