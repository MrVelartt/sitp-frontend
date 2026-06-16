import { Injectable, signal, computed } from '@angular/core';
import { TriviaQuestion, TriviaState, TriviaRank } from '@core/models/trivia.model';
import { TRIVIA_QUESTIONS } from '@app/mocks/trivia.mock';

@Injectable({ providedIn: 'root' })
export class TriviaService {
  private readonly _questions = signal<TriviaQuestion[]>([]);
  private readonly _state = signal<TriviaState>({
    gameState: 'start',
    currentIndex: 0,
    score: 0,
    streak: 0,
    bestStreak: 0,
    selectedIndex: null,
    answered: false,
  });

  readonly state = this._state.asReadonly();
  readonly questions = this._questions.asReadonly();

  readonly currentQuestion = computed(() => {
    const { currentIndex } = this._state();
    return this._questions()[currentIndex] ?? null;
  });

  readonly progress = computed(() => {
    const total = this._questions().length;
    return total ? (this._state().currentIndex / total) * 100 : 0;
  });

  readonly rank = computed<TriviaRank>(() => {
    const { score } = this._state();
    const total = this._questions().length;
    const pct = total ? (score / total) * 100 : 0;
    if (pct >= 80) return 'Leyenda del Llano';
    if (pct >= 50) return 'Llanero';
    return 'Novato';
  });

  startGame(): void {
    const shuffled = [...TRIVIA_QUESTIONS].sort(() => Math.random() - 0.5);
    this._questions.set(shuffled);
    this._state.set({
      gameState: 'playing',
      currentIndex: 0,
      score: 0,
      streak: 0,
      bestStreak: 0,
      selectedIndex: null,
      answered: false,
    });
  }

  selectAnswer(index: number): void {
    const st = this._state();
    if (st.answered) return;

    const correct = this.currentQuestion()?.correctIndex === index;
    const newStreak = correct ? st.streak + 1 : 0;

    this._state.set({
      ...st,
      selectedIndex: index,
      answered: true,
      score: correct ? st.score + 1 : st.score,
      streak: newStreak,
      bestStreak: Math.max(st.bestStreak, newStreak),
    });
  }

  nextQuestion(): void {
    const st = this._state();
    const nextIndex = st.currentIndex + 1;

    if (nextIndex >= this._questions().length) {
      this._state.set({ ...st, gameState: 'result', answered: false, selectedIndex: null });
    } else {
      this._state.set({
        ...st,
        currentIndex: nextIndex,
        selectedIndex: null,
        answered: false,
      });
    }
  }

  resetGame(): void {
    this._state.set({
      gameState: 'start',
      currentIndex: 0,
      score: 0,
      streak: 0,
      bestStreak: 0,
      selectedIndex: null,
      answered: false,
    });
    this._questions.set([]);
  }
}
