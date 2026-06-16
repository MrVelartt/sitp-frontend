export interface TriviaQuestion {
  id: number;
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
  category: 'historia' | 'personajes' | 'tradiciones' | 'ciudad';
}

export interface TriviaState {
  gameState: 'start' | 'playing' | 'result';
  currentIndex: number;
  score: number;
  streak: number;
  bestStreak: number;
  selectedIndex: number | null;
  answered: boolean;
}

export type TriviaRank = 'Novato' | 'Llanero' | 'Leyenda del Llano';
