import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { TestTimer } from "@/components/TestTimer";
import { QuestionNavigation } from "@/components/QuestionNavigation";
import { mockTests } from "@/data/mockTests";
import { Answer, Test as TestType } from "@/types/exam";
import { useToast } from "@/components/ui/use-toast";

const Test = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [test, setTest] = useState<TestType | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [startTime] = useState<number>(Date.now());

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
  }, [id, navigate, toast]);

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
            <h2 className="text-2xl font-bold mb-6">
              Question {currentQuestion + 1} of {test.questions.length}
            </h2>
            <p className="text-lg mb-6">{currentQuestionData.text}</p>
            
            <RadioGroup
              onValueChange={handleAnswer}
              value={answers.find((a) => a.questionId === currentQuestionData.id)?.selectedOption.toString()}
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
      </div>

      <QuestionNavigation
        totalQuestions={test.questions.length}
        currentQuestion={currentQuestion}
        answers={answers}
        onQuestionSelect={setCurrentQuestion}
      />
    </div>
  );
};

export default Test;
