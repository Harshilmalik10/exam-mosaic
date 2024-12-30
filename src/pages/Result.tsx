import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockTests } from "@/data/mockTests";
import { Answer, Test, TestResult } from "@/types/exam";
import { cn } from "@/lib/utils";

const Result = () => {
  const { id } = useParams();
  const location = useLocation();
  const [result, setResult] = useState<TestResult | null>(null);
  const [test, setTest] = useState<Test | null>(null);

  useEffect(() => {
    const currentTest = mockTests.find((t) => t.id === Number(id));
    if (!currentTest || !location.state?.answers) return;

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
  }, [id, location.state]);

  if (!test || !result) return null;

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
                <p className="text-2xl font-bold text-success">{result.correctAnswers}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-gray-600">Incorrect Answers</p>
                <p className="text-2xl font-bold text-error">{result.incorrectAnswers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {test.questions.map((question, index) => {
            const answer = result.answers.find((a) => a.questionId === question.id);
            const isCorrect = answer?.selectedOption === question.correctAnswer;

            return (
              <Card key={question.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold">Question {index + 1}</h3>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-sm",
                      isCorrect ? "bg-success/10 text-success" : "bg-error/10 text-error"
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
                          optionIndex === question.correctAnswer && "bg-success/10",
                          answer?.selectedOption === optionIndex && optionIndex !== question.correctAnswer && "bg-error/10"
                        )}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                  {!isCorrect && (
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                      <p className="text-sm font-medium">Explanation:</p>
                      <p className="text-sm text-gray-600">{question.explanation}</p>
                    </div>
                  )}
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