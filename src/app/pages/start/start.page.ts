import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { startMock } from '@app/mocks';
import {
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
  IonThumbnail,
  IonTitle,
  IonText,
  IonList,
  IonButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { FeatureCardComponent, FooterStartComponent } from './components';
import { Router } from '@angular/router';
import {
  AppConfigService,
  AppService,
  ToastService,
  LoadingService,
} from '@core/services';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonList,
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
  // protected readonly infoStart = signal<Start>(startMock);
  private readonly router = inject(Router);
  private readonly appConfigService = inject(AppConfigService);
  private readonly appService = inject(AppService);
  private readonly toastService = inject(ToastService);
  private readonly loadingService = inject(LoadingService);

  protected readonly infoStart = this.appService.infoStart;
  protected readonly isLoading = this.appService.isLoading;
  protected readonly isError = this.appService.isError;

  constructor() {
    addIcons({ logo: String(this.infoStart()?.logo) });

    effect(() => {
      if (this.isLoading()) {
        this.loadingService.show('Cargando información de inicio');
      } else {
        this.loadingService.hide();
      }
    });

    effect(() => {
      const errorMessage = this.isError();
      if (errorMessage) {
        this.toastService.show({
          isError: true,
          message: errorMessage,
        });
      }
    });

    effect(() => console.log('infoStart', this.infoStart()));
  }

  protected async navigateToMap(): Promise<void> {
    try {
      await Promise.all([
        this.appConfigService.setAppAsVisited(),
        this.router.navigate(['/home'], { replaceUrl: true }),
      ]);
    } catch (error) {
      console.error('Failed to navigate to home:', error);
      this.toastService.show({
        isError: true,
        message: 'Error al navegar al home',
      });
    }
  }
}
