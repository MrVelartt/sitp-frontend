import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ItemSearchComponent } from '@app/components';
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
  GoogleMapsModule,
} from '@angular/google-maps';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { locate } from 'ionicons/icons';
import { environment } from '@env/environment';
import { BusStop } from '@app/models';
import { busStops } from '@app/mocks';

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
    GoogleMapsModule,
    GoogleMap,
    MapAdvancedMarker,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapPage {
  private readonly router = inject(Router);

  private readonly googleMap = viewChild<GoogleMap>('map');

  protected center: google.maps.LatLngLiteral = { lat: 4.142, lng: -73.62664 };
  protected zoom = signal<number>(13);
  protected options: google.maps.MapOptions = {
    disableDefaultUI: true,
    mapId: environment.mapId,
  };

  protected advancedMarkerOptions: google.maps.marker.AdvancedMarkerElementOptions =
    {
      gmpDraggable: false,
    };

  protected markers = signal<google.maps.marker.AdvancedMarkerElement[]>([]);

  private readonly busStops = signal<BusStop[]>(busStops);

  constructor() {
    addIcons({ locate, filterCustom: 'assets/icons/filter.svg' });

    effect(() => {
      console.log(this.googleMap());
    });
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.center = event.latLng.toJSON();
    }
  }

  navigateToListRoutes(): void {
    this.router.navigate(['/routes']);
  }

  addMarker(event: google.maps.MapMouseEvent): void {
    if (event.latLng) {
      // Crear el elemento del marcador dinámicamente
      const markerElement = document.createElement('div');
      markerElement.className = 'custom-marker';
      markerElement.style.background = '#ffff00';

      // Crear la imagen
      const img = document.createElement('img');
      img.src = 'assets/icons/bus-stop-marker.svg';
      img.width = 20;
      img.height = 20;
      img.alt = 'Marcador personalizado';

      // Añadir la imagen al contenedor
      markerElement.appendChild(img);

      // Añadir estilos adicionales si es necesario
      markerElement.style.cursor = 'pointer';

      // Añadir el marcador a la lista
      const advancedMarker: google.maps.marker.AdvancedMarkerElement = {
        position: event.latLng.toJSON(),
        content: markerElement,
      } as any;

      this.markers.update((currentMarkers) => [
        ...currentMarkers,
        advancedMarker,
      ]);

      console.log(this.markers());
    }
  }
}
