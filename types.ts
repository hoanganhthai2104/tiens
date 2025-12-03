export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface LeaderboardEntry {
    name: string;
    score: number;
    timestamp: number;
}

export type Difficulty = 'Dễ' | 'Vừa' | 'Khó';