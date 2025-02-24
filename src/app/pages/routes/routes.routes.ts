import { Routes } from '@angular/router';

export const routesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./routes.page').then((m) => m.RoutesPage),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../route-list/route-list.page').then((m) => m.RouteListPage),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('../route-detail/route-detail.page').then(
            (m) => m.RouteDetailPage
          ),
      },
    ],
  },
];
