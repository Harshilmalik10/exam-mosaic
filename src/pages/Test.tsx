import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { TestTimer } from "@/components/TestTimer";
import { QuestionNavigation } from "@/components/QuestionNavigation";
import { mockTests } from "@/data/mockTests";
import { Answer, Test as TestType, Question } from "@/types/exam";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface CategoryQuestions {
  [key: string]: Question[];
}

const Test = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [test, setTest] = useState<TestType | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [visitedQuestions, setVisitedQuestions] = useState<number[]>([]);
  const [startTime] = useState<number>(Date.now());
  const [questionsByCategory, setQuestionsByCategory] = useState<CategoryQuestions>({});

  useEffect(() => {
    const foundTest = mockTests.find((t) => t.id === Number(id));
    if (!foundTest) {
      toast({
        title: "Test not found",
        description: "The requested test could not be found.",
        variant: "destructive",
      });
      navigate("/");
      return;
    }
    setTest(foundTest);

    // Organize questions by category
    const categorized = foundTest.questions.reduce((acc: CategoryQuestions, question) => {
      const category = question.category || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(question);
      return acc;
    }, {});
    setQuestionsByCategory(categorized);
  }, [id, navigate, toast]);

  useEffect(() => {
    if (test?.questions[currentQuestion]?.id) {
      setVisitedQuestions(prev => {
        if (!prev.includes(test.questions[currentQuestion].id)) {
          return [...prev, test.questions[currentQuestion].id];
        }
        return prev;
      });
    }
  }, [currentQuestion, test]);

  if (!test) return null;

  const handleAnswer = (value: string) => {
    const newAnswer: Answer = {
      questionId: test.questions[currentQuestion].id,
      selectedOption: parseInt(value),
      timeTaken: Math.floor((Date.now() - startTime) / 1000),
    };

    setAnswers((prev) => {
      const existing = prev.findIndex((a) => a.questionId === newAnswer.questionId);
      if (existing !== -1) {
        const updated = [...prev];
        updated[existing] = newAnswer;
        return updated;
      }
      return [...prev, newAnswer];
    });
  };

  const handleSubmit = () => {
    navigate(`/result/${test.id}`, { state: { answers, timeTaken: Date.now() - startTime } });
  };

  const currentQuestionData = test.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-20">
      <TestTimer duration={test.duration} onTimeUp={handleSubmit} />
      
      <div className="container max-w-4xl ml-48">
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <div className="mb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold">
                  Question {currentQuestion + 1} of {test.questions.length}
                </h2>
                {currentQuestionData.category && (
                  <span className="text-sm text-gray-500">Category: {currentQuestionData.category}</span>
                )}
              </div>
            </div>
            <p className="text-lg mb-6">{currentQuestionData.text}</p>
            
            <RadioGroup
              onValueChange={handleAnswer}
              value={answers.find((a) => a.questionId === currentQuestionData.id)?.selectedOption?.toString()}
            >
              {currentQuestionData.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 mb-4">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            {currentQuestion === test.questions.length - 1 ? (
              <Button onClick={handleSubmit}>Submit Test</Button>
            ) : (
              <Button
                onClick={() => setCurrentQuestion((prev) => Math.min(test.questions.length - 1, prev + 1))}
              >
                Next
              </Button>
            )}
          </div>
        </div>

        <div className="fixed left-4 top-32 bg-white p-4 rounded-lg shadow-lg w-40">
          <QuestionNavigation
            totalQuestions={test.questions.length}
            currentQuestion={currentQuestion}
            answers={answers}
            visitedQuestions={visitedQuestions}
            onQuestionSelect={setCurrentQuestion}
          />

          <div className="mt-8 space-y-4 text-sm">
            {Object.entries(questionsByCategory).map(([category, questions]) => (
              <div key={category} className="space-y-2">
                <h3 className="font-semibold text-xs text-gray-600">{category}</h3>
                <div className="grid grid-cols-4 gap-1">
                  {questions.map((question) => {
                    const questionIndex = test.questions.findIndex(q => q.id === question.id);
                    const isAnswered = answers.some(a => a.questionId === question.id);
                    const isVisited = visitedQuestions.includes(question.id);
                    const isCurrent = currentQuestion === questionIndex;

                    return (
                      <button
                        key={question.id}
                        onClick={() => setCurrentQuestion(questionIndex)}
                        className={cn(
                          "w-6 h-6 rounded-full text-xs font-medium transition-colors",
                          isAnswered && "bg-green-500 text-white",
                          !isAnswered && isVisited && "bg-yellow-500 text-white",
                          !isAnswered && !isVisited && "bg-gray-200",
                          isCurrent && "ring-2 ring-primary"
                        )}
                      >
                        {questionIndex + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;