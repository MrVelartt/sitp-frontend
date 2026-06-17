import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonButton, IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  trophyOutline, refreshOutline, arrowForwardOutline,
  checkmarkCircle, closeCircle, ribbonOutline, flameOutline,
} from 'ionicons/icons';
import { TriviaService } from '@core/services/trivia.service';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.page.html',
  styleUrls: ['./trivia.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IonContent, IonButton, IonIcon],
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

  private touchStartX = 0;

  constructor() {
    addIcons({
      trophyOutline, refreshOutline, arrowForwardOutline,
      checkmarkCircle, closeCircle, ribbonOutline, flameOutline,
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

  onTouchStart(e: TouchEvent): void {
    this.touchStartX = e.touches[0].clientX;
  }

  onTouchEnd(e: TouchEvent): void {
    const diff = this.touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 60 && this.trivia.state().answered) {
      if (diff > 0) this.trivia.nextQuestion(); // swipe izquierda = siguiente
    }
  }
}
