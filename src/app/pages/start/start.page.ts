import { Component, OnInit, signal } from '@angular/core';
import { startMock } from '@app/mocks';
import { Start } from '@app/models';
import {
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
  IonThumbnail,
  IonTitle,
  IonText,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { location, map } from 'ionicons/icons';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonLabel,
    IonItem,
    IonList,
    IonIcon,
    IonText,
    IonTitle,
    IonRow,
    IonCol,
    IonGrid,
    IonContent,
    IonThumbnail,
  ],
})
export class StartPage implements OnInit {
  protected readonly infoStart = signal<Start>(startMock);
  constructor() {
    addIcons({
      logo: this.infoStart().logo,
      location,
      map,
      routes: 'assets/icons/routes.svg',
    });
  }

  ngOnInit() {}
}
