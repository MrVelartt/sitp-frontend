import { IonText } from '@ionic/angular/standalone';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  input,
  OnDestroy,
} from '@angular/core';
import { AbstractControl, TouchedChangeEvent } from '@angular/forms';
import { filter, merge, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss'],
  standalone: true,
  imports: [IonText],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorComponent implements OnDestroy {
  private readonly cdr = inject(ChangeDetectorRef);

  readonly control = input<AbstractControl | null>();

  private readonly destroy$ = new Subject<void>();

  constructor() {
    effect(() => {
      const currentControl = this.control();
      this.destroy$.next();
      if (!currentControl) return;

      merge(currentControl.valueChanges, currentControl.statusChanges)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.cdr.markForCheck());

      currentControl.events
        .pipe(
          takeUntil(this.destroy$),
          filter((event) => event instanceof TouchedChangeEvent),
        )
        .subscribe(() => this.cdr.markForCheck());
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
