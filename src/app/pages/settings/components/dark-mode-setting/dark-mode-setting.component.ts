import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  IonItem,
  IonLabel,
  IonIcon,
  IonToggle,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { moon } from 'ionicons/icons';

@Component({
  selector: 'app-dark-mode-setting',
  templateUrl: './dark-mode-setting.component.html',
  styleUrls: ['./dark-mode-setting.component.scss'],
  standalone: true,
  imports: [IonToggle, IonIcon, IonLabel, IonItem],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DarkModeSettingComponent {
  constructor() {
    addIcons({ moon });
  }
}
