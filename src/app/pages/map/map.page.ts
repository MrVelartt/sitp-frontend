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
import { GoogleMap } from '@angular/google-maps';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { locate, filter } from 'ionicons/icons';

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapPage {
  private readonly router = inject(Router);

  center: google.maps.LatLngLiteral = { lat: 4.142, lng: -73.62664 };
  zoom = 13;
  display!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    disableDefaultUI: true,
  };

  constructor() {
    addIcons({ locate, filter: 'assets/icons/filter.svg' });
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.center = event.latLng.toJSON();
    }
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.display = event.latLng.toJSON();
    }
  }

  navigateToListRoutes(): void {
    this.router.navigate(['/routes']);
  }
}

// AIzaSyCb7TG2DKpvRjGVu8drGm5JILskaFelB3Y
