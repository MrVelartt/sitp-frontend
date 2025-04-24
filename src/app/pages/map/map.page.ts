import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ItemSearchComponent } from '@shared/components';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import {
  GoogleMap,
  MapAdvancedMarker,
  MapPolyline,
  // MapDirectionsRenderer,
  MapDirectionsService,
  GoogleMapsModule,
} from '@angular/google-maps';
import { ActivatedRoute, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { locate } from 'ionicons/icons';
import { environment } from '@env/environment';
import { BusMarker, BusStop, Route } from '@core/models';
import { buses, busStops } from '@app/mocks';
import { lastValueFrom, map, Observable } from 'rxjs';
// import { AsyncPipe } from '@angular/common';
import { RouteService, LoadingService, ToastService } from '@core/services';

export interface MapDirectionsResponse {
  status: google.maps.DirectionsStatus;
  result?: google.maps.DirectionsResult;
}

interface RoutePolyline {
  id: number;
  vertices: google.maps.LatLngLiteral[];
  options: google.maps.PolylineOptions;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonCol,
    IonRow,
    IonGrid,
    IonContent,
    IonHeader,
    IonToolbar,
    ItemSearchComponent,
    GoogleMap,
    MapAdvancedMarker,
    MapPolyline,
    // MapDirectionsRenderer,
    // AsyncPipe,
    GoogleMapsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapPage {
  private readonly router = inject(Router);
  private readonly mapDirectionsService = inject(MapDirectionsService);
  private readonly route = inject(ActivatedRoute);
  private readonly routeService = inject(RouteService);
  private readonly loadingService = inject(LoadingService);
  private readonly toastService = inject(ToastService);

  // protected directionsResults$!: Observable<
  //   google.maps.DirectionsResult | undefined
  // >;

  protected center: google.maps.LatLngLiteral = { lat: 4.142, lng: -73.62664 };
  protected readonly zoom = signal<number>(13);
  protected readonly options: google.maps.MapOptions = {
    disableDefaultUI: true,
    mapId: environment.mapId,
  };

  // protected vertices = signal<google.maps.LatLngLiteral[]>([
  //   { lat: 4.162768, lng: -73.663293 },
  //   { lat: 4.159686, lng: -73.662328 },
  //   { lat: 4.158862, lng: -73.661899 },
  //   { lat: 4.155845, lng: -73.658841 },
  //   { lat: 4.155513, lng: -73.657553 },
  //   { lat: 4.156059, lng: -73.655536 },
  //   { lat: 4.157428, lng: -73.650333 },
  //   { lat: 4.158884, lng: -73.64852 },
  //   { lat: 4.15928, lng: -73.645601 },
  //   { lat: 4.158745, lng: -73.642394 },
  //   { lat: 4.15776, lng: -73.638692 },
  //   { lat: 4.157375, lng: -73.638553 },
  //   { lat: 4.157193, lng: -73.638113 },
  //   { lat: 4.153107, lng: -73.634281 },
  //   { lat: 4.147768, lng: -73.635353 },
  //   { lat: 4.146955, lng: -73.636523 },
  //   { lat: 4.14429, lng: -73.634399 },
  //   { lat: 4.139592, lng: -73.635203 },
  //   { lat: 4.134306, lng: -73.636566 },
  //   { lat: 4.132947, lng: -73.637091 },
  //   { lat: 4.131652, lng: -73.638068 },
  //   { lat: 4.127597, lng: -73.638808 },
  //   { lat: 4.127932, lng: -73.640589 },
  //   { lat: 4.128173, lng: -73.640761 },
  //   { lat: 4.128021, lng: -73.641096 },
  //   { lat: 4.12766, lng: -73.641061 },
  //   { lat: 4.121278, lng: -73.6443 },
  //   { lat: 4.118202, lng: -73.646022 },
  //   { lat: 4.113459, lng: -73.651778 },
  //   { lat: 4.112439, lng: -73.652699 },
  //   { lat: 4.107792, lng: -73.655565 },
  //   { lat: 4.105526, lng: -73.656472 },
  //   { lat: 4.104501, lng: -73.657367 },
  //   { lat: 4.104057, lng: -73.657636 },
  //   { lat: 4.103583, lng: -73.657582 },
  //   { lat: 4.09908, lng: -73.660077 },
  //   { lat: 4.094144, lng: -73.663629 },
  //   { lat: 4.088712, lng: -73.670252 },
  //   { lat: 4.088257, lng: -73.670713 },
  //   { lat: 4.087974, lng: -73.670161 },
  //   { lat: 4.086604, lng: -73.669206 },
  //   { lat: 4.070571, lng: -73.669533 },
  //   { lat: 4.068821, lng: -73.668215 },
  //   { lat: 4.068542, lng: -73.66792 },
  //   { lat: 4.067804, lng: -73.667271 },
  //   { lat: 4.065817, lng: -73.67217 },
  //   { lat: 4.064196, lng: -73.670878 },
  //   { lat: 4.061542, lng: -73.669944 },
  //   { lat: 4.059392, lng: -73.670118 },
  //   { lat: 4.056961, lng: -73.677381 },
  // ]);

  // protected readonly arrayVertices = signal<google.maps.LatLngLiteral[][]>([]);

  protected readonly routes = signal<RoutePolyline[]>([]);

  protected advancedMarkerOptions: google.maps.marker.AdvancedMarkerElementOptions =
    {
      // gmpDraggable: true,
    };

  protected busStopsMarkers = signal<
    google.maps.marker.AdvancedMarkerElement[]
  >([]);

  // protected busesMarkers = signal<google.maps.marker.AdvancedMarkerElement[]>(
  //   [],
  // );

  private readonly busStops = signal<BusMarker[]>(busStops);
  // private readonly buses = signal<BusMarker[]>(buses);

  constructor() {
    addIcons({ locate, filterCustom: 'assets/icons/filter.svg' });

    this.route.queryParams.subscribe(({ id }) => {
      console.log('params', id);
      this.clearMap();
      id ? this.getRoutes(id) : this.getStops();
    });

    // effect(() => {
    //   const busStops = this.busStops();
    //   if (busStops?.length) {
    //     busStops.forEach((busStop) => this.addBusStopMarker(busStop));
    //   }
    // });

    // effect(() => {
    //   const buses = this.buses();
    //   if (buses?.length) {
    //     buses.forEach((bus) => this.addBusMarker(bus));
    //   }
    // });

    // this.setRoute();
  }

  clearMap(): void {
    this.busStopsMarkers.set([]);
    this.routes.set([]);
    // this.arrayVertices.set([]);
    // this.busesMarkers.set([]);
  }

  private async getRoutes(ids: string): Promise<void> {
    await this.loadingService.show('Cargando rutas...');

    try {
      const arrayIds = ids.split(',').map(Number);
      const requests = await this.getRequestRoutes(arrayIds);
      const routes = await Promise.all(requests);
      console.log('routes', routes);
      routes.forEach((route) => {
        this.addRoute(route);
        this.addBusStopsFromRoute(route);
      });
    } catch (error) {
      console.error('Error fetching routes:', error);
      this.toastService.show({
        isError: true,
        message: 'Error al cargar las rutas',
      });
    } finally {
      this.loadingService.hide();
    }
  }

  private addRoute(route: Route): void {
    const { id, color, coordinates } = route;
    this.routes.update((currentRoutes) => [
      ...currentRoutes,
      {
        id,
        vertices: coordinates || [],
        options: {
          strokeColor: color,
          strokeOpacity: 1.0,
          strokeWeight: 4,
        },
      },
    ]);
  }

  private addBusStopsFromRoute(route: Route): void {
    const { color, busStops } = route;
    busStops.forEach((busStop) => {
      const busMaker: BusMarker = { ...busStop, color };
      this.addBusStopMarker(busMaker);
    });
  }

  private async getRequestRoutes(ids: number[]): Promise<Promise<Route>[]> {
    return ids.map(async (id) =>
      lastValueFrom(this.routeService.getRouteDetail(id)),
    );
  }

  private async getStops(): Promise<void> {
    await this.loadingService.show('Cargando paraderos...');

    try {
      const busStops = await lastValueFrom(this.routeService.getBusStops());
      console.log('roubusStopstes', busStops);
      this.addBusStops(busStops);
    } catch (error) {
      console.error('Error fetching busStops:', error);
      this.toastService.show({
        isError: true,
        message: 'Error al cargar los paraderos',
      });
    } finally {
      this.loadingService.hide();
    }
  }

  private addBusStops(busStops: BusStop[]): void {
    busStops.forEach((busStop) => {
      const busMaker = { ...busStop } as BusMarker;
      this.addBusStopMarker(busMaker);
    });
  }

  // private async setRoute(): Promise<void> {
  //   // @ts-ignore
  //   const { TravelMode } = await google.maps.importLibrary('routes');
  //   const request: google.maps.DirectionsRequest = {
  //     destination: { lat: 4.157807460820786, lng: -73.63858055388546 },
  //     origin: { lat: 4.156849438398552, lng: -73.65544674282299 },
  //     travelMode: TravelMode.DRIVING,
  //   };

  //   console.log('request', request);
  //   this.directionsResults$ = this.mapDirectionsService.route(request).pipe(
  //     map((response) => {
  //       console.log('response', response);
  //       return response.result;
  //     }),
  //   );

  //   console.log('terminandooooooooooooooooooooo ');
  // }

  protected moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.center = event.latLng.toJSON();
    }
  }

  protected navigateToListRoutes(): void {
    this.router.navigate(['/routes']);
  }

  // private addBusMarker(bus: BusMarker): void {
  //   const { id, position } = bus;

  //   // Crear el elemento del marcador dinámicamente
  //   const markerElement = document.createElement('div');
  //   markerElement.className = 'bus-marker';

  //   // Crear la imagen
  //   const img = document.createElement('img');
  //   img.src = 'assets/icons/bus-marker.svg';
  //   img.width = 20;
  //   img.height = 20;
  //   img.alt = 'Marcador personalizado';

  //   // Añadir la imagen al contenedor
  //   markerElement.appendChild(img);

  //   // Añadir el marcador a la lista
  //   const advancedMarker: google.maps.marker.AdvancedMarkerElement = {
  //     id,
  //     position,
  //     content: markerElement,
  //   } as any;

  //   this.busesMarkers.update((currentMarkers) => [
  //     ...currentMarkers,
  //     advancedMarker,
  //   ]);
  // }

  private addBusStopMarker(busStop: BusMarker): void {
    console.log('addBusStopMarker', busStop);
    const { id, position, name } = busStop;

    // Crear el elemento del marcador dinámicamente
    const markerElement = document.createElement('div');
    markerElement.className = 'bus-stop-marker';
    markerElement.style.backgroundColor = busStop.color || '#2563EB';

    // Crear la imagen
    const img = document.createElement('img');
    img.src = 'assets/icons/bus-stop-marker.svg';
    img.width = 20;
    img.height = 20;
    img.alt = 'Marcador personalizado';

    // Opcional: Añadir un tooltip o etiqueta
    const label = document.createElement('div');
    label.textContent = name;
    label.style.display = 'none';

    // Añadir la imagen al contenedor
    markerElement.appendChild(img);
    markerElement.appendChild(label);

    // Añadir el marcador a la lista
    const advancedMarker: google.maps.marker.AdvancedMarkerElement = {
      id,
      position,
      content: markerElement,
    } as any;

    this.busStopsMarkers.update((currentMarkers) => [
      ...currentMarkers,
      advancedMarker,
    ]);
  }

  protected openInfoWindow(
    event: google.maps.MapMouseEvent,
    marker: google.maps.marker.AdvancedMarkerElement,
  ): void {
    console.log('openInfoWindow', event, marker);
    const { content } = marker;
    const label = content?.childNodes?.[1] as HTMLElement;
    const isVisible = label.style.display === 'block';
    label.style.display = isVisible ? 'none' : 'block';
    console.log(label);
  }
}
