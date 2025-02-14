import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-footer-start',
  templateUrl: './footer-start.component.html',
  styleUrls: ['./footer-start.component.scss'],
  standalone: true,
  imports: [IonText],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterStartComponent {}
