import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
  output,
} from '@angular/core';
import { CapitalizePipe } from '@shared/pipes';
import { Route } from '@core/models';
import { register } from 'swiper/element/bundle';
import { convertHexToRgba } from '@shared/utils';
import { NgStyle } from '@angular/common';
register();

@Component({
  selector: 'app-carousel-favorites',
  templateUrl: './carousel-favorites.component.html',
  styleUrls: ['./carousel-favorites.component.scss'],
  imports: [CapitalizePipe, NgStyle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarouselFavoritesComponent {
  readonly favorites = input.required<Route[]>();
  readonly favoriteChange = output<number>();

  protected convertHexToRgba = convertHexToRgba;

  constructor() {}

  protected onSwiperInit(swiper: any) {
    setTimeout(() => swiper.target.swiper.update());
  }

  protected onClick(routeId: number): void {
    this.favoriteChange.emit(routeId);
  }
}
