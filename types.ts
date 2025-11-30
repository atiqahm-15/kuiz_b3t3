export type ClassName = '3A' | '3C' | '3E' | '3H' | '3J';

export interface User {
  name: string;
  className: ClassName;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export enum AppState {
  LOGIN = 'LOGIN',
  QUIZ = 'QUIZ',
  RESULT = 'RESULT',
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: Record<number, number>; // questionId -> selectedOptionIndex
  score: number;
}