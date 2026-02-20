import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Feedback } from '../features/admin-dashboard/model/feedback-module';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
    private baseUrl = environment.apiUrl;
    constructor(private http: HttpClient) {}

    getFeedbacks() {
    return this.http.get<Feedback[]>(`${this.baseUrl}/feedbacks`);
  }

  createFeedback(data: { text: string }) {
  return this.http.post(`${this.baseUrl}/feedbacks`, data);
}
}
