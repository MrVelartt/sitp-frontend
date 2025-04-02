import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
} from '@ionic/angular/standalone';
import {
  DarkModeSettingComponent,
  FooterSettingsComponent,
  LanguageSettingComponent,
  LocationSharingSettingComponent,
} from './components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    IonList,
    IonCol,
    IonRow,
    IonGrid,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    LanguageSettingComponent,
    DarkModeSettingComponent,
    LocationSharingSettingComponent,
    FooterSettingsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPage {
  private readonly router = inject(Router);

  constructor() {}

  protected navitagateToLocationSharing() {
    this.router.navigate(['/location-sharing']);
  }
}
