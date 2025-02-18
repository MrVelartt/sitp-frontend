import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { RouteMock } from '@app/mocks';
import { Route } from '@app/models';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { map } from 'ionicons/icons';
import { ItemSearchComponent, RouteCardComponent } from '../components';
import { Router } from '@angular/router';
import { MainButtonComponent } from '@app/components';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.page.html',
  styleUrls: ['./route-list.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonList,
    IonCol,
    IonRow,
    IonGrid,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    ItemSearchComponent,
    RouteCardComponent,
    MainButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteListPage {
  protected readonly router = inject(Router);
  protected readonly routes = signal<Route[]>(RouteMock);

  constructor() {
    addIcons({ map });
  }

  navigateToRouteDetail(routedId: string) {
    console.log('Navigating to route detail with id:', routedId);
    this.router.navigate(['routes', routedId]);
  }
}
