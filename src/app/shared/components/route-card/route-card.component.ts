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
const ACCENT_COLORS = [
  { border: '#C9A227', text: '#C9A227', bg: 'rgba(201,162,39,0.13)' },
  { border: '#3FA593', text: '#3FA593', bg: 'rgba(63,165,147,0.13)' },
  { border: '#C2425B', text: '#C2425B', bg: 'rgba(194,66,91,0.13)'  },
  { border: '#6FA3C2', text: '#6FA3C2', bg: 'rgba(111,163,194,0.13)'},
];

export class RouteCardComponent {
  readonly route = input.required<Route>();
  readonly cardIndex = input<number>(0);
  readonly seeRouteChange = output<number>();
  readonly seeDetailRouteChange = output<number>();
  readonly favoriteChange = output<Route>();

  protected convertHexToRgba = convertHexToRgba;

  protected get accent() { return ACCENT_COLORS[this.cardIndex() % 4]; }

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
