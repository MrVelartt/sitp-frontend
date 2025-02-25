import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonText, IonFooter } from '@ionic/angular/standalone';

@Component({
  selector: 'app-footer-start',
  templateUrl: './footer-start.component.html',
  styleUrls: ['./footer-start.component.scss'],
  standalone: true,
  imports: [IonFooter, IonText],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterStartComponent {}
