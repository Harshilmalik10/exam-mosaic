import { cn } from "@/lib/utils";
import { Answer } from "@/types/exam";

interface QuestionNavigationProps {
  totalQuestions: number;
  currentQuestion: number;
  answers: Answer[];
  onQuestionSelect: (index: number) => void;
}

export const QuestionNavigation = ({
  totalQuestions,
  currentQuestion,
  answers,
  onQuestionSelect,
}: QuestionNavigationProps) => {
  return (
    <div className="fixed right-4 top-32 bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Questions</h3>
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: totalQuestions }).map((_, index) => {
          const isAnswered = answers.some((a) => a.questionId === index + 1);
          const isCurrent = currentQuestion === index;

          return (
            <button
              key={index}
              onClick={() => onQuestionSelect(index)}
              className={cn(
                "w-8 h-8 rounded-full text-sm font-medium transition-colors",
                isAnswered && "bg-primary text-white",
                isCurrent && "ring-2 ring-primary",
                !isAnswered && !isCurrent && "bg-gray-100"
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