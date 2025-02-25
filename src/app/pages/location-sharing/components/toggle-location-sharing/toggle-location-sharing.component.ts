import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { MainButtonComponent } from '@app/components';
import { ToastService } from '@core/services';
import { IonItem, IonToggle, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';

enum LocationSharingColor {
  SHARING = 'octonary',
  NOT_SHARING = 'septenary',
}

@Component({
  selector: 'app-toggle-location-sharing',
  templateUrl: './toggle-location-sharing.component.html',
  styleUrls: ['./toggle-location-sharing.component.scss'],
  standalone: true,
  imports: [IonIcon, IonToggle, IonItem, MainButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleLocationSharingComponent implements OnInit {
  private readonly toastService = inject(ToastService);

  isSharingLocation = input.required<boolean>();
  sharingLocationChange = output<void>();

  protected locationSharingColor = computed<LocationSharingColor>(
    () =>
      LocationSharingColor[this.isSharingLocation() ? 'SHARING' : 'NOT_SHARING']
  );

  protected checked = signal<boolean>(false);

  constructor() {
    addIcons({ sharing: 'assets/icons/sharing.svg' });
  }

  ngOnInit(): void {
    this.checked.set(this.isSharingLocation());
  }

  toggleLocationSharing(event: Event): void {
    const { checked } = event.target as HTMLIonCheckboxElement;
    this.checked.set(checked);
  }

  sharingLocation(): void {
    const isChecked = this.checked();
    const isCurrentlySharing = this.isSharingLocation();

    if (isChecked === isCurrentlySharing) {
      const message = isChecked
        ? 'La localización compartida ya está activada'
        : 'La localización compartida ya está desactivada';

      this.toastService.show({
        isError: false,
        message: message,
      });
      return;
    }

    this.sharingLocationChange.emit();
  }
}
