import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { ItemSearchComponent } from '@shared/components';
import {
  HomeComingSoonComponent,
  HomeFavoritesComponent,
  HomeItemButtonComponent,
} from './components';
import { addIcons } from 'ionicons';
import { bus, location } from 'ionicons/icons';
import { FavoriteService } from '@core/services';
import { Route } from '@core/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonCol,
    IonRow,
    IonGrid,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    ItemSearchComponent,
    HomeItemButtonComponent,
    HomeFavoritesComponent,
    HomeComingSoonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  private readonly router = inject(Router);
  private readonly favoriteService = inject(FavoriteService);

  protected readonly favorites = computed<Route[]>(() =>
    this.favoriteService.getFormattedRoutes(),
  );

  constructor() {
    addIcons({
      bus,
      routes: 'assets/icons/routes.svg',
      starRound: 'assets/icons/star.svg',
      location,
    });
  }

  navigateToPage(url: string): void {
    this.router.navigate([url]);
  }

  navigateToMap(): void {
    this.router.navigate(['map'], { queryParams: { all: 'true' } });
  }
}
