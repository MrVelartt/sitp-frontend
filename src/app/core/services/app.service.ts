import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AppEndpoint } from '../endpoints';
import { Feature, Start } from '../models';
import { featureAdapter, infoStartAdapter } from '../adapters';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly http = inject(HttpClient);

  constructor() {}

  getInfoStart(): Observable<Start> {
    return this.http
      .get<[Start]>(AppEndpoint.info)
      .pipe(map((response) => infoStartAdapter(response)));
  }

  getFeatures(): Observable<Feature[]> {
    return this.http
      .get<Feature[]>(AppEndpoint.features)
      .pipe(map((response) => featureAdapter(response)));
  }
}
