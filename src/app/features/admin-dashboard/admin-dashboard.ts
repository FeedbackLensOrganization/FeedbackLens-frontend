import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../config/api-service';
import { Feedback } from './model/feedback-module';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
  private apiService = inject(ApiService);

  error = signal<string | null>(null);
  now = new Date();
  constructor() {
    this.feedbacks();
  }

  feedbacks = toSignal(
    this.apiService.getFeedbacks().pipe(
      catchError((err) => {
        this.error.set('Fehler beim Laden');
        return of([]);
      }),
    ),
    { initialValue: [] },
  );
}
