export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subject: string;
  category?: string; // Added optional category field
}

export interface Test {
  id: number;
  title: string;
  subject: string;
  description: string;
  duration: number; // in minutes
  questions: Question[];
  negativeMarking: number; // percentage of marks deducted for wrong answers
}

export interface Answer {
  questionId: number;
  selectedOption: number;
  timeTaken: number;
}

export interface TestResult {
  testId: number;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  timeTaken: number;
  answers: Answer[];
}