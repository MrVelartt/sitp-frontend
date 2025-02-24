import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonApp, IonRouterOutlet, IonSpinner } from '@ionic/angular/standalone';
import { StorageService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonSpinner],
})
export class AppComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly storageService = inject(StorageService);

  loading = true;

  constructor() {}

  async ngOnInit(): Promise<void> {
    try {
      const isVisited = await this.storageService.getPreferences('isVisited');
      const route = isVisited ? '/map' : '/start';
      await this.router.navigate([route], { replaceUrl: true });
    } catch (error) {
      console.error('Failed to initialize app:', error);
      await this.router.navigate(['/start'], { replaceUrl: true });
    } finally {
      this.loading = false;
    }
  }
}
