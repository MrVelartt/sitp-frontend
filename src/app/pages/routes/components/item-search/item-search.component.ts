import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IonInput, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { search } from 'ionicons/icons';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.scss'],
  standalone: true,
  imports: [IonIcon, IonInput],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemSearchComponent {
  placeholder = input<string>('Buscar');

  constructor() {
    addIcons({ search });
  }
}
