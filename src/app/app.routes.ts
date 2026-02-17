import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    // ── Feedback ──
    path: '',
    loadComponent: () => import('./features/public/feedback/feedback').then((m) => m.Feedback),
    title: 'Feedback',
  },
  {
    // ── Auth ────────────────────────────────────────────────────────
    path: 'login',
    loadComponent: () =>
      import('./features/public/auth/auth').then((m) => m.Auth),
    title: 'FeedbackLens – Login',
  },
];
