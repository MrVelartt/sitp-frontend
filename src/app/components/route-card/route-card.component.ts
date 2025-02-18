import { NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { Route } from '@app/models';
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
  route = input.required<Route>();
  seeRouteChange = output<string>();
  seeDetailRouteChange = output<string>();

  constructor() {
    addIcons({
      arrowForwardOutline,
      starRound: 'assets/icons/star.svg',
      starRoundOutline: 'assets/icons/star-outline.svg',
    });
  }

  seeRoute(event: Event, routeId: number): void {
    event.stopPropagation();
    this.seeRouteChange.emit(String(routeId));
  }

  seeDetailRoute(event: Event, routeId: number): void {
    event.stopPropagation();
    this.seeDetailRouteChange.emit(String(routeId));
  }

  convertHexToRgba(hex: string, alpha: number): string {
    hex = hex.replace(/^#/, '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}
