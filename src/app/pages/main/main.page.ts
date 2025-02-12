import { Component, OnInit } from '@angular/core';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { map, settings, star } from 'ionicons/icons';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [IonIcon, IonTabButton, IonTabBar, IonTabs],
})
export class MainPage implements OnInit {
  constructor() {
    addIcons({
      map,
      star,
      settings,
      routes: 'assets/icons/routes.svg',
    });
  }

  ngOnInit() {}
}
