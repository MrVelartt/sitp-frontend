import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { ItemSearchComponent } from '@shared/components';
import {
  HomeFavoritesComponent,
  HomeItemButtonComponent,
  HomeRecentRoutesComponent,
} from './components';
import { addIcons } from 'ionicons';
import { bus, location } from 'ionicons/icons';
import { AppService, FavoriteService } from '@core/services';
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
    IonText,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    ItemSearchComponent,
    HomeItemButtonComponent,
    HomeFavoritesComponent,
    HomeRecentRoutesComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  private readonly router = inject(Router);
  private readonly favoriteService = inject(FavoriteService);
  private readonly appService = inject(AppService);

  protected readonly favorites = computed<Route[]>(() =>
    this.favoriteService.getFormattedRoutes(),
  );
  protected readonly recentRoutes = computed<Route[]>(() => {
    console.log('recentRoutes', this.appService.getFormattedSearchs());
    return this.appService.getFormattedSearchs();
  });

  protected readonly greetingMessage = signal<string>(
    this.getGreetingMessage(),
  );

  constructor() {
    addIcons({
      bus,
      routes: 'assets/icons/routes.svg',
      starRound: 'assets/icons/star.svg',
      location,
    });

    this.appService.getRecentRoutes();
    this.getGreetingMessage();
  }

  private getGreetingMessage(): string {
    const currentHour = new Date().getHours();
    console.log({ currentHour });
    if (currentHour < 12) {
      return 'Buenos días';
    } else if (currentHour < 18) {
      return 'Buenas tardes';
    } else {
      return 'Buenas noches';
    }
  }

  navigateToPage(url: string): void {
    this.router.navigate([url]);
  }

  navigateToMap(): void {
    this.router.navigate(['map'], { queryParams: { all: 'true' } });
  }
}
