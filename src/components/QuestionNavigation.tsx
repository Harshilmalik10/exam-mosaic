import { cn } from "@/lib/utils";
import { Answer } from "@/types/exam";

interface QuestionNavigationProps {
  totalQuestions: number;
  currentQuestion: number;
  answers: Answer[];
  visitedQuestions?: number[];
  onQuestionSelect: (index: number) => void;
  correctAnswers?: number[]; // Optional prop for results page
  showResults?: boolean; // Flag to determine if we're on results page
}

export const QuestionNavigation = ({
  totalQuestions,
  currentQuestion,
  answers,
  visitedQuestions = [],
  onQuestionSelect,
  correctAnswers,
  showResults = false,
}: QuestionNavigationProps) => {
  return (
    <div className="fixed left-4 top-32 bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Questions</h3>
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: totalQuestions }).map((_, index) => {
          const answer = answers.find((a) => a.questionId === index + 1);
          const isAnswered = answers.some((a) => a.questionId === index + 1);
          const isVisited = visitedQuestions.includes(index + 1);
          const isCurrent = currentQuestion === index;
          const isCorrect = showResults && correctAnswers?.includes(index + 1);
          const isIncorrect = showResults && answer && !correctAnswers?.includes(index + 1);

          return (
            <button
              key={index}
              onClick={() => onQuestionSelect(index)}
              className={cn(
                "w-8 h-8 rounded-full text-sm font-medium transition-colors",
                !showResults && isAnswered && "bg-green-500 text-white", // Answered
                !showResults && !isAnswered && isVisited && "bg-yellow-500 text-white", // Visited but not answered
                !showResults && !isAnswered && !isVisited && "bg-gray-200", // Not visited
                isCurrent && "ring-2 ring-primary",
                showResults && isCorrect && "bg-green-500 text-white",
                showResults && isIncorrect && "bg-red-500 text-white",
                showResults && !isAnswered && "bg-gray-300"
              )}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};