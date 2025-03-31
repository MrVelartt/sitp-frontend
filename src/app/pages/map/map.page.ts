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
  MapDirectionsRenderer,
  MapDirectionsService,
  GoogleMapsModule,
} from '@angular/google-maps';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { locate } from 'ionicons/icons';
import { environment } from '@env/environment';
import { BusMarker } from '@core/models';
import { buses, busStops } from '@app/mocks';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

export interface MapDirectionsResponse {
  status: google.maps.DirectionsStatus;
  result?: google.maps.DirectionsResult;
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
    MapDirectionsRenderer,
    AsyncPipe,
    GoogleMapsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapPage {
  private readonly router = inject(Router);
  private readonly mapDirectionsService = inject(MapDirectionsService);

  protected directionsResults$!: Observable<
    google.maps.DirectionsResult | undefined
  >;

  protected center: google.maps.LatLngLiteral = { lat: 4.142, lng: -73.62664 };
  protected zoom = signal<number>(13);
  protected options: google.maps.MapOptions = {
    disableDefaultUI: true,
    mapId: environment.mapId,
  };

  protected vertices = signal<google.maps.LatLngLiteral[]>([
    { lat: 4.120352918338897, lng: -73.61570542439154 },
    { lat: 4.115130032348051, lng: -73.63203678012559 },
    { lat: 4.120611476160724, lng: -73.64230220372986 },
  ]);

  protected advancedMarkerOptions: google.maps.marker.AdvancedMarkerElementOptions =
    {
      // gmpDraggable: true,
    };

  protected busStopsMarkers = signal<
    google.maps.marker.AdvancedMarkerElement[]
  >([]);

  protected busesMarkers = signal<google.maps.marker.AdvancedMarkerElement[]>(
    []
  );

  private readonly busStops = signal<BusMarker[]>(busStops);
  private readonly buses = signal<BusMarker[]>(buses);

  constructor() {
    addIcons({ locate, filterCustom: 'assets/icons/filter.svg' });

    effect(() => {
      const busStops = this.busStops();
      if (busStops?.length) {
        busStops.forEach((busStop) => this.addBusStopMarker(busStop));
      }
    });

    effect(() => {
      const buses = this.buses();
      if (buses?.length) {
        buses.forEach((bus) => this.addBusMarker(bus));
      }
    });

    this.setRoute();
  }

  async setRoute(): Promise<void> {
    // @ts-ignore
    const { TravelMode } = await google.maps.importLibrary('routes');

    console.log('TravelMode', TravelMode);

    const request: google.maps.DirectionsRequest = {
      destination: { lat: 4.119791624693189, lng: -73.61588602053087 },
      origin: { lat: 4.120611476160724, lng: -73.64230220372986 },
      travelMode: TravelMode.DRIVING,
    };

    console.log('request', request);
    this.directionsResults$ = this.mapDirectionsService.route(request).pipe(
      map((response) => {
        console.log('response', response);
        return response.result;
      })
    );

    console.log('terminandooooooooooooooooooooo ');
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.center = event.latLng.toJSON();
    }
  }

  navigateToListRoutes(): void {
    this.router.navigate(['/routes']);
  }

  addBusMarker(bus: BusMarker): void {
    const { id, position } = bus;

    // Crear el elemento del marcador dinámicamente
    const markerElement = document.createElement('div');
    markerElement.className = 'bus-marker';

    // Crear la imagen
    const img = document.createElement('img');
    img.src = 'assets/icons/bus-marker.svg';
    img.width = 20;
    img.height = 20;
    img.alt = 'Marcador personalizado';

    // Añadir la imagen al contenedor
    markerElement.appendChild(img);

    // Añadir el marcador a la lista
    const advancedMarker: google.maps.marker.AdvancedMarkerElement = {
      id,
      position,
      content: markerElement,
    } as any;

    this.busesMarkers.update((currentMarkers) => [
      ...currentMarkers,
      advancedMarker,
    ]);
  }

  addBusStopMarker(busStop: BusMarker): void {
    const { id, position, name } = busStop;

    // Crear el elemento del marcador dinámicamente
    const markerElement = document.createElement('div');
    markerElement.className = 'bus-stop-marker';

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

  openInfoWindow(
    event: google.maps.MapMouseEvent,
    marker: google.maps.marker.AdvancedMarkerElement
  ): void {
    console.log('openInfoWindow', event, marker);
    const { content } = marker;
    const label = content?.childNodes?.[1] as HTMLElement;
    const isVisible = label.style.display === 'block';
    label.style.display = isVisible ? 'none' : 'block';
    console.log(label);
  }
}
