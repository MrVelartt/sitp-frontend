import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  IonItem,
  IonLabel,
  IonIcon,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { language } from 'ionicons/icons';

@Component({
  selector: 'app-language-setting',
  templateUrl: './language-setting.component.html',
  styleUrls: ['./language-setting.component.scss'],
  standalone: true,
  imports: [IonIcon, IonLabel, IonItem, IonSelect, IonSelectOption],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSettingComponent {
  constructor() {
    addIcons({ language });
  }
}
