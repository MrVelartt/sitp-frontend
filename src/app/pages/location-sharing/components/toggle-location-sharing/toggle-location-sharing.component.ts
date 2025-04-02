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
import { FormErrorComponent, MainButtonComponent } from '@shared/components';
import { ToastService } from '@core/services';
import {
  IonItem,
  IonToggle,
  IonIcon,
  IonInput,
  IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { touchControlsForm } from '@shared/utils';

enum LocationSharingColor {
  SHARING = 'octonary',
  NOT_SHARING = 'septenary',
}

@Component({
  selector: 'app-toggle-location-sharing',
  templateUrl: './toggle-location-sharing.component.html',
  styleUrls: ['./toggle-location-sharing.component.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonInput,
    IonIcon,
    IonToggle,
    IonItem,
    MainButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    FormErrorComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleLocationSharingComponent implements OnInit {
  private readonly toastService = inject(ToastService);

  readonly isSharingLocation = input.required<boolean>();
  readonly sharingLocationChange = output<void>();

  protected readonly locationSharingColor = computed<LocationSharingColor>(
    () =>
      LocationSharingColor[
        this.isSharingLocation() ? 'SHARING' : 'NOT_SHARING'
      ],
  );
  protected readonly checked = signal<boolean>(false);
  protected readonly form = signal<FormGroup>(this.createForm());

  constructor() {
    addIcons({ sharing: 'assets/icons/sharing.svg' });
  }

  ngOnInit(): void {
    this.checked.set(this.isSharingLocation());
  }

  private createForm(): FormGroup {
    return new FormGroup({
      code: new FormControl('', Validators.required),
    });
  }

  protected toggleLocationSharing(event: Event): void {
    const { checked } = event.target as HTMLIonCheckboxElement;
    this.checked.set(checked);
  }

  protected onSubmit(): void {
    const form = this.form();
    if (form.invalid) {
      touchControlsForm(form);
      return;
    }

    this.sharingLocation();
  }

  private sharingLocation(): void {
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
