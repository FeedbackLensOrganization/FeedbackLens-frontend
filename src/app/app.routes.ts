import { Routes } from '@angular/router';

export const routes: Routes = [
      {
    // ── Feedback ──
    path: '',
    loadComponent: () =>
      import('./features/public/feedback/feedback').then(
        (m) => m.Feedback
      ),
    title: 'Feedback',
  },
];
