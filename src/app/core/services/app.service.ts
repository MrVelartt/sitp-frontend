import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppEndpoint } from '../endpoints';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly http = inject(HttpClient);

  constructor() {}

  getInfoStart(): Observable<any> {
    return this.http.get<any>(AppEndpoint.info);
  }

  getFeatures(): Observable<any> {
    return this.http.get<any>(AppEndpoint.features);
  }
}
