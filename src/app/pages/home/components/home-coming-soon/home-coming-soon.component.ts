import { NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronForwardOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home-coming-soon',
  templateUrl: './home-coming-soon.component.html',
  styleUrls: ['./home-coming-soon.component.scss'],
  imports: [IonIcon, IonButton, IonText, IonCol, IonGrid, IonRow, NgStyle],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComingSoonComponent {
  private readonly router = inject(Router);

  protected readonly image = signal<string>('assets/images/map.png');

  constructor() {
    addIcons({ chevronForwardOutline });
  }

  protected navigateToComingSoon(): void {
    this.router.navigate(['/coming-soon']);
  }
}
