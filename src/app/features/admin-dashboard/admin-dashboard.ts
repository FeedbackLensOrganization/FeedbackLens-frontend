import { Component, computed, inject, signal } from '@angular/core';
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

  last7DaysFeedbacks = computed(() => {
    const now = new Date();

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);

    // 👉 auf 00:00 Uhr setzen
    sevenDaysAgo.setHours(0, 0, 0, 0);

    return this.feedbacks().filter((f) => {
      const created = new Date(f.createdAt).getTime();
      return created >= sevenDaysAgo.getTime();
    });
  });

  totalCount = computed(() => this.last7DaysFeedbacks().length);
  positiveCount = computed(
    () => this.last7DaysFeedbacks().filter((f) => f.sentiment === 'POSITIVE').length,
  );

  negativeCount = computed(
    () => this.last7DaysFeedbacks().filter((f) => f.sentiment === 'NEGATIVE').length,
  );

  neutralCount = computed(
    () =>
      this.last7DaysFeedbacks().filter((f) => f.sentiment === 'NEUTRAL' || f.sentiment === 'MIXED')
        .length,
  );
}
