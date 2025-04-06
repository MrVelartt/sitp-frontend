import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, tap, throwError } from 'rxjs';
import { AppEndpoint } from '../endpoints';
import { Start } from '../models';
import { infoStartAdapter } from '../adapters';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly http = inject(HttpClient);

  readonly infoStart = signal<Start | null>(null);
  readonly isLoading = signal<boolean>(false);
  readonly isError = signal<string | null>(null);

  constructor() {
    this.getInfoStart();
  }

  getInfoStart(): void {
    if (this.isLoading()) return;

    this.isLoading.set(true);
    this.isError.set(null);

    this.http
      .get<[Start]>(AppEndpoint.info)
      .pipe(
        map((response) => infoStartAdapter(response)),
        tap((response) => {
          this.infoStart.set(response);
          this.isLoading.set(false);
        }),
        catchError((error) => {
          this.isLoading.set(false);
          this.isError.set('Error al obtener la información de inicio');
          return throwError(() => error);
        })
      )
      .subscribe();
  }
}
