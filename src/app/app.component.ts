import { AppConfigService } from '@app/core';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonApp, IonRouterOutlet, IonSpinner } from '@ionic/angular/standalone';
import { STORAGE_KEYS } from './core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonApp, IonRouterOutlet, IonSpinner],
})
export class AppComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly appConfigService = inject(AppConfigService);

  loading = true;

  constructor() {}

  ngOnInit(): void {
    this.initializeApp();
  }

  async initializeApp(): Promise<void> {
    try {
      const initialRoute = await this.appConfigService.determineInitialRoute();
      await this.router.navigate([initialRoute], { replaceUrl: true });
    } catch (error) {
      console.error('Failed to initialize app:', error);
      await this.router.navigate(['/start'], { replaceUrl: true });
    } finally {
      this.loading = false;
    }
  }
}
