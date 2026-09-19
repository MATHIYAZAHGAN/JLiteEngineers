import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { timer } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeepAliveService {
  private http = inject(HttpClient);

  initKeepAlive(): void {
    // Immediate ping on app startup, then recurring ping every 3 minutes
    const interval = environment.renderKeepAliveIntervalMs || 180000;
    
    timer(0, interval).subscribe(() => {
      this.pingBackend();
    });
  }

  private pingBackend(): void {
    this.http.get<{ status: string }>(`${environment.apiUrl}/health`).pipe(
      catchError(() => of({ status: 'offline' }))
    ).subscribe(res => {
      if (res.status === 'Healthy') {
        console.log('[Render Keep-Alive]: Live Backend Warm & Active');
      }
    });
  }
}
