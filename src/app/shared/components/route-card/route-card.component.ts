import { NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { Route } from '@core/models';
import {
  IonCardHeader,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonText,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowForwardOutline } from 'ionicons/icons';

@Component({
  selector: 'app-route-card',
  templateUrl: './route-card.component.html',
  styleUrls: ['./route-card.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonText,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCard,
    IonCardHeader,
    NgStyle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteCardComponent {
  readonly route = input.required<Route>();
  readonly seeRouteChange = output<number>();
  readonly seeDetailRouteChange = output<number>();
  readonly favoriteChange = output<Route>();

  constructor() {
    addIcons({
      arrowForwardOutline,
      starRound: 'assets/icons/star.svg',
      starRoundOutline: 'assets/icons/star-outline.svg',
    });
  }

  protected seeRoute(event: Event): void {
    event.stopPropagation();
    this.seeRouteChange.emit(this.route().id);
  }

  protected seeDetailRoute(event: Event): void {
    event.stopPropagation();
    this.seeDetailRouteChange.emit(this.route().id);
  }

  protected favorite(event: Event): void {
    event.stopPropagation();
    this.favoriteChange.emit(this.route());
  }

  protected convertHexToRgba(hex: string, alpha: number): string {
    hex = hex.replace(/^#/, '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}
