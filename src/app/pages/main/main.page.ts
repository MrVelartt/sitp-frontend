import { Component } from '@angular/core';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { map, settings, home, trophyOutline } from 'ionicons/icons';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [IonIcon, IonTabButton, IonTabBar, IonTabs],
})
export class MainPage {
  constructor() {
    addIcons({
      map,
      settings,
      home,
      trophyOutline,
      routes: 'assets/icons/routes.svg',
      starRound: 'assets/icons/star.svg',
    });
  }
}
