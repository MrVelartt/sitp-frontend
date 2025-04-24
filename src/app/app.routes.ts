import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/main/main.page').then((m) => m.MainPage),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'map',
        loadComponent: () =>
          import('./pages/map/map.page').then((m) => m.MapPage),
      },
      {
        path: 'routes',
        loadComponent: () =>
          import('./pages/route-list/route-list.page').then(
            (m) => m.RouteListPage,
          ),
        // loadChildren: () =>
        //   import('./pages/routes/routes.routes').then((m) => m.routesRoutes),
      },
    ],
  },
  {
    path: 'start',
    loadComponent: () =>
      import('./pages/start/start.page').then((m) => m.StartPage),
  },
  {
    path: 'route-detail/:id',
    loadComponent: () =>
      import('./pages/route-detail/route-detail.page').then(
        (m) => m.RouteDetailPage,
      ),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./pages/settings/settings.page').then((m) => m.SettingsPage),
  },
  {
    path: 'location-sharing',
    loadComponent: () =>
      import('./pages/location-sharing/location-sharing.page').then(
        (m) => m.LocationSharingPage,
      ),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./pages/favorites/favorites.page').then((m) => m.FavoritesPage),
  },
  {
    path: 'coming-soon',
    loadComponent: () =>
      import('./pages/coming-soon/coming-soon.page').then(
        (m) => m.ComingSoonPage,
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
