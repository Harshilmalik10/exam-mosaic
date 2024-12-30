import { Test } from "../types/exam";

export const mockTests: Test[] = [
  {
    id: 1,
    title: "Basic Mathematics",
    subject: "Mathematics",
    description: "Test your basic math skills with this comprehensive exam",
    duration: 30,
    negativeMarking: 0.25,
    questions: [
      {
        id: 1,
        text: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: 1,
        explanation: "2 + 2 equals 4, which is a basic addition problem",
        subject: "Mathematics",
      },
      {
        id: 2,
        text: "What is 10 × 5?",
        options: ["40", "45", "50", "55"],
        correctAnswer: 2,
        explanation: "10 multiplied by 5 equals 50",
        subject: "Mathematics",
      },
    ],
  },
  {
    id: 2,
    title: "Basic Physics",
    subject: "Physics",
    description: "Test your understanding of basic physics concepts",
    duration: 45,
    negativeMarking: 0.25,
    questions: [
      {
        id: 3,
        text: "What is the SI unit of force?",
        options: ["Watt", "Newton", "Joule", "Pascal"],
        correctAnswer: 1,
        explanation: "The SI unit of force is Newton (N)",
        subject: "Physics",
      },
      {
        id: 4,
        text: "What is the speed of light in vacuum?",
        options: ["299,792 km/s", "299,792,458 m/s", "300,000 km/s", "3 × 10⁸ m/s"],
        correctAnswer: 1,
        explanation: "The speed of light in vacuum is approximately 299,792,458 meters per second",
        subject: "Physics",
      },
    ],
  },
];