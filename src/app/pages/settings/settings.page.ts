import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  LanguageSettingComponent,
  LocationSharingSettingComponent,
} from './components';

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPage {}
