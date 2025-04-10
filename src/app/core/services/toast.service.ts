import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly _toastController = inject(ToastController);

  constructor() {}

  async show({
    isError,
    message,
    duration = 1500,
    position = 'bottom',
  }: {
    isError: boolean;
    message: string;
    duration?: number;
    position?: 'top' | 'bottom' | 'middle';
  }): Promise<void> {
    const toast = await this._toastController.create({
      message,
      duration,
      position,
      cssClass: isError ? 'toast-error' : 'toast-success',
    });

    await toast.present();
  }
}
