import { Component, computed, inject, signal } from '@angular/core';
import { ApiService } from '../../config/api-service';
import { Feedback } from './model/feedback-module';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
  private apiService = inject(ApiService);
  refreshTrigger = signal(0);

  error = signal<string | null>(null);
  now = new Date();
  constructor() {
    this.feedbacks();
  }

  feedbacks = toSignal(
    toObservable(this.refreshTrigger).pipe(
      switchMap(() =>
        this.apiService.getFeedbacks().pipe(
          catchError((err) => {
            this.error.set('Fehler beim Laden');
            return of([]);
          }),
        ),
      ),
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

  chartData = computed(() => {
    const feedbacks = this.last7DaysFeedbacks();
    const days: {
      label: string;
      dateKey: string;
      positive: number;
      negative: number;
      neutral: number;
    }[] = [];

    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const dateKey = date.toISOString().split('T')[0];

      const dayFeedbacks = feedbacks.filter((f) => {
        const created = new Date(f.createdAt);
        created.setHours(0, 0, 0, 0);
        return created.toISOString().split('T')[0] === dateKey;
      });

      days.push({
        label: date.toLocaleDateString('de-DE', { weekday: 'short' }),
        dateKey,
        positive: dayFeedbacks.filter((f) => f.sentiment === 'POSITIVE').length,
        negative: dayFeedbacks.filter((f) => f.sentiment === 'NEGATIVE').length,
        neutral: dayFeedbacks.filter((f) => f.sentiment === 'NEUTRAL' || f.sentiment === 'MIXED')
          .length,
      });
    }

    return days;
  });

  maxDayTotal = computed(() =>
    Math.max(...this.chartData().map((d) => d.positive + d.negative + d.neutral), 1),
  );

  // Aktueller Filter
  selectedFilter = signal<'ALL' | 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' | 'MIXED'>('ALL');

  // Gefilterte Feedbacks für Anzeige
  filteredFeedbacks = computed(() => {
    const filter = this.selectedFilter();
    const feedbacks = this.last7DaysFeedbacks();

    if (filter === 'ALL') return feedbacks;

    if (filter === 'NEUTRAL') {
      return feedbacks.filter((f) => f.sentiment === 'NEUTRAL');
    }

    if (filter === 'MIXED') {
      return feedbacks.filter((f) => f.sentiment === 'MIXED');
    }

    return feedbacks.filter((f) => f.sentiment === filter);
  });

  // Methode zum Setzen des Filters
  setFilter(filter: 'ALL' | 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' | 'MIXED') {
    this.selectedFilter.set(filter);
  }

  refreshDashboard() {
    this.refreshTrigger.update((v) => v + 1);
    this.now = new Date(); // Zeit aktualisieren
  }
}
