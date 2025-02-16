import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.page.html',
  styleUrls: ['./routes.page.scss'],
  standalone: true,
  imports: [IonRouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutesPage {}
