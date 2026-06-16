import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonButton, IonIcon, IonProgressBar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  trophyOutline, refreshOutline, arrowForwardOutline,
  starOutline, star, checkmarkCircle, closeCircle,
  ribbonOutline, flameOutline,
} from 'ionicons/icons';
import { TriviaService } from '@core/services/trivia.service';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.page.html',
  styleUrls: ['./trivia.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    IonContent, IonButton, IonIcon, IonProgressBar,
  ],
})
export class TriviaPage {
  protected readonly trivia = inject(TriviaService);

  readonly categoryLabels: Record<string, string> = {
    historia: 'Historia',
    personajes: 'Personajes',
    tradiciones: 'Tradiciones',
    ciudad: 'Ciudad',
  };

  readonly optionLetters = ['A', 'B', 'C', 'D'];

  constructor() {
    addIcons({
      trophyOutline, refreshOutline, arrowForwardOutline,
      starOutline, star, checkmarkCircle, closeCircle,
      ribbonOutline, flameOutline,
    });
  }

  getOptionState(index: number): 'correct' | 'wrong' | 'default' | 'dimmed' {
    const { answered, selectedIndex } = this.trivia.state();
    const correctIndex = this.trivia.currentQuestion()?.correctIndex;
    if (!answered) return 'default';
    if (index === correctIndex) return 'correct';
    if (index === selectedIndex) return 'wrong';
    return 'dimmed';
  }
}
