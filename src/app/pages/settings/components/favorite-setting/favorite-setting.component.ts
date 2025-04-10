import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  output,
} from '@angular/core';
import {
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-favorite-setting',
  templateUrl: './favorite-setting.component.html',
  styleUrls: ['./favorite-setting.component.scss'],
  imports: [IonIcon, IonButton, IonItem, IonLabel],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteSettingComponent {
  readonly clickChange = output<void>();

  constructor() {
    addIcons({ starRound: 'assets/icons/star.svg' });
  }

  protected onClick() {
    this.clickChange.emit();
  }
}
