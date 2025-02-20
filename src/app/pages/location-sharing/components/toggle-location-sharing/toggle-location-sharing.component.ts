import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import { IonItem, IonToggle, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';

enum LocationSharingColor {
  SHARING = 'septenary',
  NOT_SHARING = 'nonary',
}

@Component({
  selector: 'app-toggle-location-sharing',
  templateUrl: './toggle-location-sharing.component.html',
  styleUrls: ['./toggle-location-sharing.component.scss'],
  standalone: true,
  imports: [IonIcon, IonToggle, IonItem],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleLocationSharingComponent {
  isSharingLocation = input.required<boolean>();

  locationSharingColor = computed<LocationSharingColor>(
    () =>
      LocationSharingColor[this.isSharingLocation() ? 'SHARING' : 'NOT_SHARING']
  );

  constructor() {
    addIcons({ sharing: 'assets/icons/sharing.svg' });
  }

  toggleLocationSharing(checked: any) {
    // this.isSharingLocation(checked);
    console.log(checked);
  }
}
