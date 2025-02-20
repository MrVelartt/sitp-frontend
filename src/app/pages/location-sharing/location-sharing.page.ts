import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-location-sharing',
  templateUrl: './location-sharing.page.html',
  styleUrls: ['./location-sharing.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonButtons,
    IonBackButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationSharingPage {
  constructor() {}
}
