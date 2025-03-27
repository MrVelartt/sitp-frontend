import { inject, Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private readonly loadingController = inject(LoadingController);
  private loading!: HTMLIonLoadingElement;

  constructor() {}

  async show(message: string): Promise<void> {
    this.loading = await this.loadingController.create({
      message,
      // spinner: 'circles',
    });

    await this.loading.present();
  }

  async hide(): Promise<void> {
    this.loading?.dismiss();
  }
}
