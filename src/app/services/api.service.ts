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

export interface OrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

export interface CreatePaymentRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  pincode: string;
  items: OrderItem[];
  totalAmount: number;
}

export interface PaymentInitResponse {
  success: boolean;
  message: string;
  merchantTransactionId: string;
  redirectUrl: string;
}

export interface PaymentStatusResponse {
  success: boolean;
  code: string;
  message: string;
  merchantTransactionId: string;
  amount: number;
  paymentState: string;
  customerName: string;
  customerEmail: string;
  createdAt: string;
  items: OrderItem[];
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

  initiatePayment(request: CreatePaymentRequest): Observable<PaymentInitResponse> {
    return this.http.post<PaymentInitResponse>(`${this.apiUrl}/payment/initiate`, request);
  }

  checkPaymentStatus(merchantTransactionId: string): Observable<PaymentStatusResponse> {
    return this.http.get<PaymentStatusResponse>(`${this.apiUrl}/payment/status/${merchantTransactionId}`);
  }
}
