import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { startMock } from '@app/mocks';
import { Start } from '@app/models';
import {
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
  IonThumbnail,
  IonTitle,
  IonText,
  IonIcon,
  IonList,
  IonButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { FeatureCardComponent, FooterStartComponent } from './components';
import { Router } from '@angular/router';
import { StorageService, STORAGE_KEYS } from '@app/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonList,
    IonIcon,
    IonText,
    IonTitle,
    IonRow,
    IonCol,
    IonGrid,
    IonContent,
    IonThumbnail,
    FeatureCardComponent,
    FooterStartComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartPage {
  protected readonly infoStart = signal<Start>(startMock);
  private readonly router = inject(Router);
  private readonly storageService = inject(StorageService);

  constructor() {
    addIcons({
      logo: this.infoStart().logo,
    });
  }

  async navigateToMap(): Promise<void> {
    try {
      await this.storageService.setPreferences(STORAGE_KEYS.isVisited, true);
      await this.router.navigate(['/map']);
    } catch (error) {
      console.error('Failed to navigate to map:', error);
    }
  }
}
