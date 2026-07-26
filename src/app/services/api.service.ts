import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ContactRequest {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface QuoteRequest {
  name: string;
  email: string;
  phone: string;
  company?: string;
  projectType: string;
  siteType?: string;
  quantity?: string;
  budget?: string;
  location?: string;
  timeline?: string;
  urgency?: string;
  details?: string;
}

export interface ApiResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  submitContact(request: ContactRequest): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/contact`, request);
  }

  submitQuote(request: QuoteRequest): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/quote`, request);
  }
}
