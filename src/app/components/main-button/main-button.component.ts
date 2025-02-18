import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { map } from 'ionicons/icons';

@Component({
  selector: 'app-main-button',
  templateUrl: './main-button.component.html',
  styleUrls: ['./main-button.component.scss'],
  standalone: true,
  imports: [IonButton, IonIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainButtonComponent {
  label = input.required<string>();
  iconName = input<string>();

  constructor() {
    addIcons({ map });
  }
}
