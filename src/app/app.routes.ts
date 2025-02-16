import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'map',
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/main/main.page').then((m) => m.MainPage),
    children: [
      {
        path: 'map',
        loadComponent: () =>
          import('./pages/map/map.page').then((m) => m.MapPage),
      },
      {
        path: 'routes',
        // loadComponent: () =>
        //   import('./pages/routes/routes.page').then((m) => m.RoutesPage),
        loadChildren: () =>
          import('./pages/routes/routes.routes').then((m) => m.routesRoutes),
      },
      {
        path: 'favorites',
        loadComponent: () =>
          import('./pages/favorites/favorites.page').then(
            (m) => m.FavoritesPage
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/settings/settings.page').then((m) => m.SettingsPage),
      },
    ],
  },
  {
    path: 'start',
    loadComponent: () =>
      import('./pages/start/start.page').then((m) => m.StartPage),
  },
  {
    path: '**',
    redirectTo: 'map',
    pathMatch: 'full',
  },
  {
    path: 'route-detail',
    loadComponent: () =>
      import('./pages/routes/route-detail/route-detail.page').then(
        (m) => m.RouteDetailPage
      ),
  },
  {
    path: 'route-list',
    loadComponent: () =>
      import('./pages/routes/route-list/route-list.page').then(
        (m) => m.RouteListPage
      ),
  },
];
