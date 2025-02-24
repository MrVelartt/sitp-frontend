import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  async setPreferences(key: string, value: any): Promise<void> {
    await Preferences.set({ key, value: JSON.stringify(value) });
  }

  async getPreferences(key: string): Promise<any | null> {
    const { value } = await Preferences.get({ key });
    return value ? JSON.parse(value) : null;
  }

  async removePreferences(key: string): Promise<void> {
    await Preferences.remove({ key });
  }

  async clearPreferences(): Promise<void> {
    await Preferences.clear();
  }
}
