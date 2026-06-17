import { NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { IonIcon, IonItem, IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home-item-button',
  templateUrl: './home-item-button.component.html',
  styleUrls: ['./home-item-button.component.scss'],
  imports: [IonText, IonIcon, IonItem, NgStyle],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeItemButtonComponent {
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly icon = input.required<string>();
  readonly backgroundColor = input<string>('#263cd1');
  readonly textColor = input<string>('#ECE6D8');
  readonly clickChange = output<void>();

  constructor() {}

  protected onClick() {
    this.clickChange.emit();
  }
}
