import { NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { IonIcon, IonItem } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronForwardOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home-item-button',
  templateUrl: './home-item-button.component.html',
  styleUrls: ['./home-item-button.component.scss'],
  imports: [IonIcon, IonItem, NgStyle],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeItemButtonComponent {
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly icon = input.required<string>();
  readonly backgroundColor = input<string>('#263cd1');
  readonly textColor = input<string>('#ECE6D8');
  readonly clickChange = output<void>();

  protected readonly iconCircleBg = computed(() =>
    this.textColor() === '#15171A' || this.textColor() === '#1F1B14'
      ? 'rgba(0,0,0,0.12)'
      : 'rgba(255,255,255,0.12)',
  );

  constructor() {
    addIcons({ chevronForwardOutline });
  }

  protected onClick() {
    this.clickChange.emit();
  }
}
