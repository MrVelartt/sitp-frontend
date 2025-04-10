import { Pipe, PipeTransform } from '@angular/core';
import { capitalizeText } from '../utils';

@Pipe({
  name: 'capitalize',
  standalone: true,
})
export class CapitalizePipe implements PipeTransform {
  transform(text: string): string {
    return capitalizeText(text);
  }
}
