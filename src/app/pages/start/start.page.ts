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
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
  standalone: true,
  imports: [
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
    addIcons({ logo: this.infoStart().logo });
  }

  ngOnInit() {}
}
