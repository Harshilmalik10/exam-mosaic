import { SubjectCard } from "@/components/SubjectCard";
import { mockTests } from "@/data/mockTests";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-4xl py-8">
        <h1 className="text-3xl font-bold mb-8">Available Tests</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockTests.map((test) => (
            <SubjectCard key={test.id} test={test} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;