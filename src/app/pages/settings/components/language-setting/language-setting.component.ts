import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { AppConfigService } from '@core/services';
import {
  IonItem,
  IonLabel,
  IonIcon,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { language } from 'ionicons/icons';

@Component({
  selector: 'app-language-setting',
  templateUrl: './language-setting.component.html',
  styleUrls: ['./language-setting.component.scss'],
  standalone: true,
  imports: [IonIcon, IonLabel, IonItem, IonSelect, IonSelectOption],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSettingComponent {
  private readonly appConfigService = inject(AppConfigService);
  protected readonly language = signal<string>('');

  constructor() {
    addIcons({ language });
  }

  ngOnInit() {
    this.getLanguage();
  }

  private async getLanguage(): Promise<void> {
    const lang = await this.appConfigService.getLanguage();
    this.language.set(lang);
    console.log('Language:', this.language());
  }
}
