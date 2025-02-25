import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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

  center: google.maps.LatLngLiteral = { lat: 4.142, lng: -73.62664 };
  zoom = 13;
  options: google.maps.MapOptions = {
    disableDefaultUI: true,
    mapId: environment.mapId,
  };

  advancedMarkerOptions: google.maps.marker.AdvancedMarkerElementOptions = {
    gmpDraggable: false,
  };
  // markerPositions: google.maps.LatLngLiteral[] = [];
  markers: google.maps.marker.AdvancedMarkerElement[] = [];

  constructor() {
    addIcons({ locate, filterCustom: 'assets/icons/filter.svg' });
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

      // Crear la imagen
      const img = document.createElement('img');
      img.src = 'assets/icons/logo.svg';
      img.width = 30;
      img.height = 30;
      img.alt = 'Marcador personalizado';

      // Añadir la imagen al contenedor
      markerElement.appendChild(img);

      // Añadir estilos adicionales si es necesario
      markerElement.style.cursor = 'pointer';

      // this.markerPositions.push(event.latLng.toJSON());

      // Añadir el marcador a la lista
      const advancedMarker: google.maps.marker.AdvancedMarkerElement = {
        position: event.latLng.toJSON(),
        content: markerElement,
      } as any;

      this.markers.push(advancedMarker);

      console.log(this.markers);
    }
  }
}
