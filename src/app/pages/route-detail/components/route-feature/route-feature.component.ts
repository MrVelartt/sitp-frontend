import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouteFeature } from '@core/models';
import { IonItem, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { time, sunny, moon, hourglassOutline, bus } from 'ionicons/icons';

@Component({
  selector: 'app-route-feature',
  templateUrl: './route-feature.component.html',
  styleUrls: ['./route-feature.component.scss'],
  standalone: true,
  imports: [IonItem, IonIcon, IonLabel],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteFeatureComponent {
  readonly feature = input.required<RouteFeature>();

  constructor() {
    addIcons({
      routes: 'assets/icons/routes.svg',
      time,
      sunny,
      moon,
      hourglassOutline,
      bus,
    });
  }
}
