import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, from, map, of, tap, throwError } from 'rxjs';
import { AppEndpoint } from '../endpoints';
import { Route, Start } from '../models';
import { infoStartAdapter } from '../adapters';
import { StorageService } from './storage.service';
import { STORAGE_KEYS } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly http = inject(HttpClient);
  private readonly storageService = inject(StorageService);

  readonly infoStart = signal<Start | null>(null);
  readonly isLoading = signal<boolean>(false);
  readonly isError = signal<string | null>(null);

  private readonly state = signal({
    searchs: new Map<number, Route>(),
  });

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
        }),
      )
      .subscribe();
  }

  getFormattedSearchs(): Route[] {
    return Array.from(this.state().searchs.values());
  }

  getRecentRoutes(): void {
    from(this.storageService.getPreferences(STORAGE_KEYS.RECENT_ROUTES))
      .pipe(
        catchError((error) => {
          console.error(error);
          return of([]);
        }),
      )
      .subscribe((result) => {
        console.log('result getRoutes', result);
        result.forEach((route: Route) =>
          this.state().searchs.set(route.id, route),
        );
        this.state.set({ searchs: this.state().searchs });
      });
  }

  async addRecentRoute(route: Route): Promise<void> {
    this.state.update((state) => {
      state.searchs.set(route.id, { ...route });
      return { searchs: state.searchs };
    });
    await this.storageService.setPreferences(
      STORAGE_KEYS.RECENT_ROUTES,
      this.getFormattedSearchs(),
    );
  }
}
