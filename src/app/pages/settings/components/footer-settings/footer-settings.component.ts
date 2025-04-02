import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  IonButton,
  IonIcon,
  IonFooter,
  IonText,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-footer-settings',
  templateUrl: './footer-settings.component.html',
  styleUrls: ['./footer-settings.component.scss'],
  standalone: true,
  imports: [IonText, IonIcon, IonButton, IonFooter],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterSettingsComponent {
  protected readonly currentYear = signal<number>(new Date().getFullYear());

  constructor() {
    addIcons({ support: 'assets/icons/support.svg' });
  }
}
