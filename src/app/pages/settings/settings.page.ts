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
  FavoriteSettingComponent,
  FooterSettingsComponent,
  LanguageSettingComponent,
  LocationSharingSettingComponent,
  ComingSoonComponent,
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
    FavoriteSettingComponent,
    ComingSoonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPage {
  private readonly router = inject(Router);

  constructor() {}

  protected navitagateToPage(url: string) {
    this.router.navigate([url]);
  }
}
