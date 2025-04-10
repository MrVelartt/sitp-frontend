import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { detailRouteMock } from '@app/mocks';
import { Route, RouteFeature } from '@core/models';
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
import { MainButtonComponent } from '@shared/components';
import { Router } from '@angular/router';
import { RouteFeatureComponent } from './components';
import { LoadingService, RouteService } from '@core/services';
import { ToastService } from '../../core/services/toast.service';
import { lastValueFrom } from 'rxjs';

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
  private readonly router = inject(Router);
  private readonly routeService = inject(RouteService);
  private readonly toastService = inject(ToastService);
  private readonly loadingService = inject(LoadingService);

  readonly id = input<string>();

  // protected route = computed<Route>(() => detailRouteMock(Number(this.id())));
  protected route = signal<Route | null>(null);

  protected routeFeatures = computed<RouteFeature[]>(() => {
    const route = this.route();
    return [
      {
        id: 1,
        icon: 'routes',
        title: 'Distancia',
        description: route?.distance || '',
      },
      {
        id: 2,
        icon: 'time',
        title: 'Tiempo de viaje',
        description: route?.travelTime || '',
      },
      {
        id: 3,
        icon: 'sunny',
        title: 'Primer bus',
        description: route?.startTime || '',
      },
      {
        id: 4,
        icon: 'moon',
        title: 'Último bus',
        description: route?.endTime || '',
      },
      {
        id: 5,
        icon: 'hourglass-outline',
        title: 'Frecuencia',
        description: `Cada ${route?.frequency} minutos`,
      },
      {
        id: 6,
        icon: 'bus',
        title: 'Cantidad',
        description: `${route?.countBuses?.toString()} buses`,
      },
    ];
  });

  protected keyNeighborhoods = computed<string>(() => {
    try {
      return this.route()?.keyNeighborhoods?.join(', ') || '';
    } catch (error) {
      return '';
    }
  });

  constructor() {
    this.getRouteDetail();
  }

  private async getRouteDetail(): Promise<void> {
    await this.loadingService.show('Cargando información de la ruta');
    try {
      const response = await lastValueFrom(
        this.routeService.getRouteDetail(Number(this.id())),
      );
      console.log('response', response);
      this.route.set(response);
    } catch (error) {
      console.error('getRouteDetail', error);
      this.toastService.show({
        isError: true,
        message: 'Error al obtener la información de la ruta',
      });
      this.backPage();
    } finally {
      this.loadingService.hide();
    }
  }

  protected navigateToMapWithRoute(): void {
    this.router.navigate(['map'], {
      queryParams: { routeId: this.route()?.id },
    });
  }

  protected backPage(): void {
    this.router.navigate(['routes']);
  }
}
