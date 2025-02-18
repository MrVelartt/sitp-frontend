import { Component, OnInit } from '@angular/core';
import {
  IonItem,
  IonLabel,
  IonIcon,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-language-setting',
  templateUrl: './language-setting.component.html',
  styleUrls: ['./language-setting.component.scss'],
  standalone: true,
  imports: [IonIcon, IonLabel, IonItem, IonSelect, IonSelectOption],
})
export class LanguageSettingComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
