import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { RouteEndpoint } from '../endpoints';
import { Route } from '../models';
import { routeAdapter, routeDetailAdapter } from '../adapters';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private readonly http = inject(HttpClient);

  private readonly routes = signal<Route[]>([]);

  constructor() {}

  getRoutes(): Observable<Route[]> {
    if (this.routes().length) return of(this.routes());
    return this.http
      .get<Route[]>(RouteEndpoint.routes)
      .pipe(
        map((routes) => routeAdapter(routes)),
        tap((routes) => this.routes.set(routes))
      );
  }

  getRouteDetail(id: number): Observable<Route> {
    return this.http
      .get<Route>(`${RouteEndpoint.routes}${id}/`)
      .pipe(map((route) => routeDetailAdapter(route)));
  }
}
