import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RouteEndpoint } from '../endpoints';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private readonly http = inject(HttpClient);

  constructor() {}

  getRoutes(): Observable<any> {
    return this.http.get<any>(RouteEndpoint.routes);
  }

  getRouteDetail(id: number): Observable<any> {
    return this.http.get<any>(`${RouteEndpoint.routeDetail}${id}`);
  }
}
