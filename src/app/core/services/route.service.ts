import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RouteEndpoint } from '../endpoints';
import { Route } from '../models';
import { routeAdapter, routeDetailAdapter } from '../adapters';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private readonly http = inject(HttpClient);

  constructor() {}

  getRoutes(): Observable<Route[]> {
    return this.http
      .get<Route[]>(RouteEndpoint.routes)
      .pipe(map((routes) => routeAdapter(routes)));
  }

  getRouteDetail(id: number): Observable<Route> {
    return this.http
      .get<Route>(`${RouteEndpoint.routeDetail}${id}/`)
      .pipe(map((route) => routeDetailAdapter(route)));
  }
}
