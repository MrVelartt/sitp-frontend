import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import {
  IonGrid,
  IonCol,
  IonRow,
  IonText,
  IonButton,
} from '@ionic/angular/standalone';
import { CarouselFavoritesComponent } from './carousel-favorites/carousel-favorites.component';
import { Router } from '@angular/router';
import { Route } from '@core/models';

@Component({
  selector: 'app-home-favorites',
  templateUrl: './home-favorites.component.html',
  styleUrls: ['./home-favorites.component.scss'],
  imports: [
    IonButton,
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    CarouselFavoritesComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeFavoritesComponent {
  private router = inject(Router);

  readonly favorites = input.required<Route[]>();

  constructor() {}

  protected navigateToFavorites(): void {
    this.router.navigate(['/favorites']);
  }

  protected navigateToDetailRoute(routeId: number): void {
    this.router.navigate(['/route-detail', routeId]);
  }
}
