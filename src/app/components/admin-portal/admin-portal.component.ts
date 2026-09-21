import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';

export interface DashboardStats {
  totalOrders: number;
  totalProducts: number;
  totalServices: number;
  pendingOrders: number;
  totalRevenue: number;
  activeContractors: number;
}

@Component({
  selector: 'app-admin-portal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-portal.component.html'
})
export class AdminPortalComponent implements OnInit {
  private http = inject(HttpClient);
  public authService = inject(AuthService);

  stats = signal<DashboardStats>({
    totalOrders: 142,
    totalProducts: 12,
    totalServices: 28,
    pendingOrders: 4,
    totalRevenue: 245990,
    activeContractors: 54
  });

  activeTab = signal<'dashboard' | 'orders' | 'inventory' | 'services'>('dashboard');

  ngOnInit(): void {
    if (this.authService.isAdmin()) {
      this.fetchStats();
    }
  }

  fetchStats(): void {
    this.http.get<DashboardStats>(`${environment.apiUrl}/admin/dashboard-stats`).subscribe({
      next: (res) => this.stats.set(res),
      error: () => {
        // Keep default mock metrics if backend is disconnected
      }
    });
  }

  setTab(tab: 'dashboard' | 'orders' | 'inventory' | 'services'): void {
    this.activeTab.set(tab);
  }
}
