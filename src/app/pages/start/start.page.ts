import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { startMock } from '@app/mocks';
import { Start } from '@core/models';
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
import { AppConfigService, AppService, ToastService } from '@core/services';
import { lastValueFrom } from 'rxjs';
import { LoadingService } from '../../core/services/loading.service';

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
  private readonly appConfigService = inject(AppConfigService);
  private readonly appService = inject(AppService);
  private readonly toastService = inject(ToastService);
  private readonly loadingService = inject(LoadingService);

  constructor() {
    addIcons({
      logo: this.infoStart().logo,
    });

    this.getInfoStart();
  }

  async getInfoStart(): Promise<void> {
    await this.loadingService.show('Cargando información de inicio');
    try {
      const response = await Promise.all([
        lastValueFrom(this.appService.getInfoStart()),
        lastValueFrom(this.appService.getFeatures()),
      ]);
      console.log('response', response);
    } catch (error) {
      console.error('getInfoStart', error);
      this.toastService.show({
        isError: true,
        message: 'Error al obtener la información de inicio',
      });
    } finally {
      this.loadingService.hide();
    }
  }

  async navigateToMap(): Promise<void> {
    try {
      await this.appConfigService.setAppAsVisited();
      await this.router.navigate(['/map']);
    } catch (error) {
      console.error('Failed to navigate to map:', error);
    }
  }
}
