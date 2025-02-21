import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonGrid,
  IonRow,
  IonItem,
  IonIcon,
  IonLabel,
  IonImg,
  IonCol,
  IonText,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { location, informationCircle } from 'ionicons/icons';
import { ToggleLocationSharingComponent } from './components';

@Component({
  selector: 'app-location-sharing',
  templateUrl: './location-sharing.page.html',
  styleUrls: ['./location-sharing.page.scss'],
  standalone: true,
  imports: [
    IonText,
    IonCol,
    IonImg,
    IonLabel,
    IonIcon,
    IonItem,
    IonRow,
    IonGrid,
    IonButtons,
    IonBackButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    ToggleLocationSharingComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationSharingPage {
  imageSharing = signal<string>('assets/images/sharing.png');
  isSharingLocation = signal<boolean>(true);

  constructor() {
    addIcons({
      location,
      informationCircle,
      privacity: 'assets/icons/privacity.svg',
    });
  }

  onSharingLocationChange(): void {
    this.isSharingLocation.update((isSharing) => !isSharing);
  }
}
