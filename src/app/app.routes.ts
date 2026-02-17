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

    {
    // ── Admin (Lazy-loaded Feature Route) ───────────────────────────
    path: 'admindashboard',
    loadChildren: () =>
      import('./features/admin-dashboard/admin-dashboard.routes').then((m) => m.ADMIN_DASHBOARD_ROUTES),
    title: 'FeedbackLens – Admin',
  },
];
