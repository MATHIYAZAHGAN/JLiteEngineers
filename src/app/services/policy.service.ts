import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface PolicyModel {
  id: string;
  type: string;
  title: string;
  contentMarkdown: string;
  lastUpdated: string;
}

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  private http = inject(HttpClient);

  getPolicy(type: string): Observable<PolicyModel> {
    return this.http.get<PolicyModel>(`${environment.apiUrl}/policies/${type}`);
  }

  getAllPolicies(): Observable<PolicyModel[]> {
    return this.http.get<PolicyModel[]>(`${environment.apiUrl}/policies/all`);
  }
}
