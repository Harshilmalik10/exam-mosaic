import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Test } from "@/types/exam";
import { useNavigate } from "react-router-dom";

interface SubjectCardProps {
  test: Test;
}

export const SubjectCard = ({ test }: SubjectCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="w-full transition-all hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{test.title}</CardTitle>
        <CardDescription>{test.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Duration: {test.duration} minutes</span>
            <span>Questions: {test.questions.length}</span>
          </div>
          <Button 
            className="w-full"
            onClick={() => navigate(`/test/${test.id}`)}
          >
            Start Test
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};