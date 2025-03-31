import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonInput, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { search } from 'ionicons/icons';
import { debounceTime, map, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.scss'],
  standalone: true,
  imports: [IonIcon, IonInput, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemSearchComponent {
  readonly placeholder = input<string>('Buscar');
  readonly clickChange = output<void>();
  readonly searchChange = output<string>();

  protected searchControl = new FormControl<string>('');

  constructor() {
    addIcons({ search });

    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        map((search) => (search ?? '').trim()),
        distinctUntilChanged(),
        takeUntilDestroyed()
      )
      .subscribe((search) => this.searchRoute(search));
  }

  protected onClick(): void {
    this.clickChange.emit();
  }

  protected searchRoute(search: string): void {
    this.searchChange.emit(search);
  }
}
