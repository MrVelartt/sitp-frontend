import { inject, Injectable, signal } from '@angular/core';
import { Route } from '../models';
import { catchError, from, of } from 'rxjs';
import { StorageService } from './storage.service';
import { STORAGE_KEYS } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private readonly storageService = inject(StorageService);

  private readonly state = signal({
    routes: new Map<number, Route>(),
  });

  constructor() {
    this.getRoutes();
  }

  getRoutesMap(): Map<number, Route> {
    return this.state().routes;
  }

  getFormattedRoutes(): Route[] {
    return Array.from(this.state().routes.values());
  }

  getRoutes(): void {
    from(this.storageService.getPreferences(STORAGE_KEYS.FAVORITES))
      .pipe(
        catchError((error) => {
          console.error(error);
          return of([]);
        }),
      )
      .subscribe((result) => {
        console.log('result getRoutes', result);
        result.forEach((route: Route) =>
          this.state().routes.set(route.id, route),
        );
        this.state.set({ routes: this.state().routes });
      });
  }

  async addRoute(route: Route): Promise<void> {
    this.state.update((state) => {
      state.routes.set(route.id, { ...route, isFavorite: true });
      return { routes: state.routes };
    });
    await this.storageService.setPreferences(
      STORAGE_KEYS.FAVORITES,
      this.getFormattedRoutes(),
    );
  }

  async deleteRoute(id: number): Promise<void> {
    this.state.update((state) => {
      state.routes.delete(id);
      return { routes: state.routes };
    });
    await this.storageService.setPreferences(
      STORAGE_KEYS.FAVORITES,
      this.getFormattedRoutes(),
    );
  }
}
