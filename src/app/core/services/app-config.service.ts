import { inject, Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { STORAGE_KEYS } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private readonly storageService = inject(StorageService);

  private defaultLang = 'es';
  constructor() {}

  async initialize(): Promise<void> {
    try {
      await Promise.all([
        this.initializeFavorites(),
        this.initializeRecentRoutes(),
        this.initializeLanguage(),
        this.initializeDarkMode(),
      ]);
    } catch (error) {
      console.error('Error al inicializar la configuración de la app:', error);
    }
  }

  private async initializeFavorites(): Promise<void> {
    const savedFavorites = await this.storageService.getPreferences(
      STORAGE_KEYS.FAVORITES,
    );
    if (!savedFavorites) {
      await this.storageService.setPreferences(STORAGE_KEYS.FAVORITES, []);
    }
  }

  private async initializeRecentRoutes(): Promise<void> {
    const savedRoutes = await this.storageService.getPreferences(
      STORAGE_KEYS.RECENT_ROUTES,
    );
    if (!savedRoutes) {
      await this.storageService.setPreferences(STORAGE_KEYS.RECENT_ROUTES, []);
    }
  }
  private async initializeLanguage(): Promise<void> {
    const savedLanguage = await this.storageService.getPreferences(
      STORAGE_KEYS.LANGUAGE,
    );

    if (!savedLanguage) {
      await this.storageService.setPreferences(
        STORAGE_KEYS.LANGUAGE,
        this.defaultLang,
      );
    }
  }

  private async initializeDarkMode(): Promise<void> {
    const savedDarkMode = await this.storageService.getPreferences(
      STORAGE_KEYS.DARK_MODE,
    );
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    console.log('prefersDark', prefersDark);

    let isDarkMode: boolean;

    if (savedDarkMode) {
      isDarkMode = savedDarkMode;
    } else {
      isDarkMode = prefersDark.matches;
      await this.storageService.setPreferences(
        STORAGE_KEYS.DARK_MODE,
        isDarkMode,
      );
    }

    // Aplicar el tema
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  async getLanguage(): Promise<string> {
    try {
      return await this.storageService.getPreferences(STORAGE_KEYS.LANGUAGE);
    } catch (error) {
      return this.defaultLang;
    }
  }

  async setLanguage(lang: string): Promise<void> {
    try {
      await this.storageService.setPreferences(STORAGE_KEYS.LANGUAGE, lang);
    } catch (error) {
      throw new Error('Error setting language');
    }
  }

  async isDarkMode(): Promise<boolean> {
    try {
      return await this.storageService.getPreferences(STORAGE_KEYS.DARK_MODE);
    } catch (error) {
      return false;
    }
  }

  async setDarkMode(enable: boolean): Promise<void> {
    await this.storageService.setPreferences(STORAGE_KEYS.DARK_MODE, enable);

    if (enable) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  async setAppAsVisited(): Promise<void> {
    await this.storageService.setPreferences(STORAGE_KEYS.IS_VISITED, true);
  }

  async determineInitialRoute(): Promise<string> {
    const isVisited = await this.storageService.getPreferences(
      STORAGE_KEYS.IS_VISITED,
    );
    return isVisited ? '/home' : '/start';
  }
}
