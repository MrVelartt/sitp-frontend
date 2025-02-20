import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import {
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { location, chevronForwardOutline } from 'ionicons/icons';

@Component({
  selector: 'app-location-sharing-setting',
  templateUrl: './location-sharing-setting.component.html',
  styleUrls: ['./location-sharing-setting.component.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonLabel, IonItem],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationSharingSettingComponent {
  clickChange = output<void>();

  constructor() {
    addIcons({ location, chevronForwardOutline });
  }

  onClick() {
    this.clickChange.emit();
  }
}
