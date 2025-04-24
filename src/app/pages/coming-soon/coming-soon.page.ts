import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCol,
  IonRow,
  IonGrid,
  IonButtons,
  IonBackButton,
  IonImg,
  IonText,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.page.html',
  styleUrls: ['./coming-soon.page.scss'],
  standalone: true,
  imports: [
    IonText,
    IonImg,
    IonBackButton,
    IonButtons,
    IonGrid,
    IonRow,
    IonCol,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComingSoonPage {
  protected readonly image = signal<string>('assets/images/map.png');

  protected readonly description = signal<string>(
    `
    <strong>🚍 Lo que viene para el sistema de buses</strong><br><br>
    Actualmente, nuestro sistema de buses cuenta con más de 38 rutas que conectan diferentes puntos de la ciudad. Sin embargo, estamos trabajando para transformar esta red en un sistema más eficiente, rápido y moderno.<br><br>
    En los próximos años, nuestro objetivo es evolucionar hacia un modelo de transporte tipo <strong>troncal</strong>, similar a sistemas como TransMilenio, donde pocas rutas principales recorrerán de forma estratégica toda la ciudad, conectando puntos clave y reduciendo tiempos de espera y traslados innecesarios.<br><br>
    Este nuevo sistema permitirá:<br>
      • Menor cantidad de rutas, pero con mayor cobertura.<br>
      • Integración más eficiente entre buses, estaciones y otros medios de transporte.<br>
      • Mejor experiencia para los usuarios gracias a recorridos más directos y predecibles.<br><br>

      ¡Estamos construyendo el futuro del transporte urbano, y tú eres parte de este camino!
    `,
  );

  constructor() {}
}
