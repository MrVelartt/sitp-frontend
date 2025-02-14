import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Feature } from '@app/models';
import {
  IonItem,
  IonThumbnail,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { location, map } from 'ionicons/icons';

@Component({
  selector: 'app-feature-card',
  templateUrl: './feature-card.component.html',
  styleUrls: ['./feature-card.component.scss'],
  imports: [IonItem, IonThumbnail, IonIcon, IonLabel],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureCardComponent {
  readonly feature = input.required<Feature>();

  constructor() {
    addIcons({
      location,
      map,
      routes: 'assets/icons/routes.svg',
    });
  }
}
