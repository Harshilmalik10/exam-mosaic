import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockTests } from "@/data/mockTests";
import { Answer, Test, TestResult } from "@/types/exam";
import { cn } from "@/lib/utils";
import { QuestionNavigation } from "@/components/QuestionNavigation";
import { useToast } from "@/components/ui/use-toast";

const Result = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [result, setResult] = useState<TestResult | null>(null);
  const [test, setTest] = useState<Test | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    const currentTest = mockTests.find((t) => t.id === Number(id));
    
    if (!currentTest) {
      toast({
        title: "Test not found",
        description: "The requested test could not be found.",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    if (!location.state?.answers) {
      toast({
        title: "No test data",
        description: "Please complete the test first to view results.",
        variant: "destructive",
      });
      navigate(`/test/${id}`);
      return;
    }

    const answers = location.state.answers as Answer[];
    const timeTaken = location.state.timeTaken as number;

    const correctAnswers = answers.filter(
      (answer) => 
        currentTest.questions.find((q) => q.id === answer.questionId)?.correctAnswer === answer.selectedOption
    ).length;

    const incorrectAnswers = answers.length - correctAnswers;
    const score = correctAnswers - (incorrectAnswers * currentTest.negativeMarking);

    setTest(currentTest);
    setResult({
      testId: currentTest.id,
      score: Math.max(0, score),
      totalQuestions: currentTest.questions.length,
      correctAnswers,
      incorrectAnswers,
      timeTaken: Math.floor(timeTaken / 1000),
      answers,
    });
  }, [id, location.state, navigate, toast]);

  if (!test || !result) {
    return null;
  }

  const correctAnswerIds = test.questions
    .filter((q) => 
      result.answers.find(a => a.questionId === q.id)?.selectedOption === q.correctAnswer
    )
    .map(q => q.id);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Test Results - {test.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-gray-600">Score</p>
                <p className="text-2xl font-bold">{result.score.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-gray-600">Time Taken</p>
                <p className="text-2xl font-bold">{Math.floor(result.timeTaken / 60)}m {result.timeTaken % 60}s</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-gray-600">Correct Answers</p>
                <p className="text-2xl font-bold text-green-500">{result.correctAnswers}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-gray-600">Incorrect Answers</p>
                <p className="text-2xl font-bold text-red-500">{result.incorrectAnswers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <QuestionNavigation
          totalQuestions={test.questions.length}
          currentQuestion={currentQuestion}
          answers={result.answers}
          onQuestionSelect={setCurrentQuestion}
          correctAnswers={correctAnswerIds}
          showResults={true}
        />

        <div className="space-y-6 mt-8">
          {test.questions.map((question, index) => {
            const answer = result.answers.find((a) => a.questionId === question.id);
            const isCorrect = answer?.selectedOption === question.correctAnswer;

            return (
              <Card key={question.id} id={`question-${index + 1}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Question {index + 1}</h3>
                      {question.category && (
                        <span className="text-sm text-gray-500">Category: {question.category}</span>
                      )}
                    </div>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-sm",
                      isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    )}>
                      {isCorrect ? "Correct" : "Incorrect"}
                    </span>
                  </div>
                  <p className="mb-4">{question.text}</p>
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={cn(
                          "p-3 rounded-lg",
                          optionIndex === question.correctAnswer && "bg-green-100",
                          answer?.selectedOption === optionIndex && optionIndex !== question.correctAnswer && "bg-red-100"
                        )}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className="text-sm font-medium">Explanation:</p>
                    <p className="text-sm text-gray-600">{question.explanation}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Result;
