import { NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { convertHexToRgba } from '@shared/utils';
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

  protected convertHexToRgba = convertHexToRgba;

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
}
