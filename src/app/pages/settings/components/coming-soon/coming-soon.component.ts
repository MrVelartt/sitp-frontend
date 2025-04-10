import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { addIcons } from 'ionicons';
import {
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
} from '@ionic/angular/standalone';
import { bus } from 'ionicons/icons';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss'],
  imports: [IonButton, IonIcon, IonLabel, IonItem],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComingSoonComponent {
  readonly clickChange = output<void>();

  constructor() {
    addIcons({ bus });
  }

  protected onClick() {
    this.clickChange.emit();
  }
}
