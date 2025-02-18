import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import { detailRouteMock } from '@app/mocks';
import { Route, RouteFeature } from '@app/models';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonText,
} from '@ionic/angular/standalone';
import { RouteFeatureComponent } from '../components';
import { MainButtonComponent } from '@app/components';

@Component({
  selector: 'app-route-detail',
  templateUrl: './route-detail.page.html',
  styleUrls: ['./route-detail.page.scss'],
  standalone: true,
  imports: [
    IonCol,
    IonRow,
    IonGrid,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonImg,
    RouteFeatureComponent,
    IonText,
    MainButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteDetailPage {
  id = input<string>();

  route = signal<Route>(detailRouteMock(Number(this.id())));

  routeFeatures = computed<RouteFeature[]>(() => {
    return [
      {
        id: 1,
        icon: 'routes',
        title: 'Distancia',
        description: this.route().distance || '',
      },
      {
        id: 2,
        icon: 'time',
        title: 'Tiempo de viaje',
        description: this.route().travelTime || '',
      },
      {
        id: 3,
        icon: 'sunny',
        title: 'Primer bus',
        description: this.route().startTime || '',
      },
      {
        id: 4,
        icon: 'moon',
        title: 'Último bus',
        description: this.route().endTime || '',
      },
      {
        id: 5,
        icon: 'hourglass-outline',
        title: 'Frecuencia',
        description: `Cada ${this.route().frequency} minutos`,
      },
      {
        id: 6,
        icon: 'bus',
        title: 'Cantidad',
        description: `${this.route().countBuses?.toString()} buses`,
      },
    ];
  });

  keyNeighborhoods = computed<string>(() => {
    return this.route()?.keyNeighborhoods?.join(', ') || '';
  });

  constructor() {}
}
