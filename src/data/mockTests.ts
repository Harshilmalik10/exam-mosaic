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
    description: "Test your understanding of basic physics concepts across Optics, Thermodynamics, and Electromagnetics",
    duration: 45,
    negativeMarking: 0.25,
    questions: [
      // Optics Questions
      {
        id: 3,
        text: "What is the phenomenon of splitting of white light into its component colors called?",
        options: ["Reflection", "Dispersion", "Diffraction", "Interference"],
        correctAnswer: 1,
        explanation: "Dispersion is the phenomenon where white light splits into its component colors when passing through a prism",
        subject: "Physics",
        category: "Optics"
      },
      {
        id: 4,
        text: "What type of mirror is used in a vehicle's headlight?",
        options: ["Convex", "Concave", "Plane", "Cylindrical"],
        correctAnswer: 1,
        explanation: "Concave mirrors are used in vehicle headlights as they can focus light into a beam",
        subject: "Physics",
        category: "Optics"
      },
      {
        id: 5,
        text: "What is the speed of light in vacuum?",
        options: ["299,792 km/s", "299,792,458 m/s", "300,000 km/s", "3 × 10⁸ m/s"],
        correctAnswer: 1,
        explanation: "The speed of light in vacuum is approximately 299,792,458 meters per second",
        subject: "Physics",
        category: "Optics"
      },
      // Thermodynamics Questions
      {
        id: 6,
        text: "What is the first law of thermodynamics also known as?",
        options: ["Law of entropy", "Conservation of energy", "Heat transfer law", "Gas law"],
        correctAnswer: 1,
        explanation: "The first law of thermodynamics is also known as the law of conservation of energy",
        subject: "Physics",
        category: "Thermodynamics"
      },
      {
        id: 7,
        text: "In which process does the temperature remain constant?",
        options: ["Adiabatic", "Isothermal", "Isobaric", "Isochoric"],
        correctAnswer: 1,
        explanation: "In an isothermal process, the temperature remains constant throughout",
        subject: "Physics",
        category: "Thermodynamics"
      },
      {
        id: 8,
        text: "What is the absolute zero temperature in Celsius?",
        options: ["-273.15°C", "-300°C", "-250°C", "-100°C"],
        correctAnswer: 0,
        explanation: "Absolute zero is -273.15°C or 0 Kelvin",
        subject: "Physics",
        category: "Thermodynamics"
      },
      // Electromagnetic Questions
      {
        id: 9,
        text: "What is the SI unit of electric current?",
        options: ["Volt", "Ampere", "Ohm", "Watt"],
        correctAnswer: 1,
        explanation: "The SI unit of electric current is the Ampere (A)",
        subject: "Physics",
        category: "Electromagnetics"
      },
      {
        id: 10,
        text: "Which law relates current, voltage, and resistance?",
        options: ["Faraday's law", "Ohm's law", "Coulomb's law", "Ampere's law"],
        correctAnswer: 1,
        explanation: "Ohm's law states that voltage equals current times resistance (V=IR)",
        subject: "Physics",
        category: "Electromagnetics"
      },
      {
        id: 11,
        text: "What happens to the force between two charges when the distance between them is doubled?",
        options: ["Doubles", "Halves", "Becomes one-fourth", "Quadruples"],
        correctAnswer: 2,
        explanation: "According to Coulomb's law, the force becomes one-fourth when distance is doubled",
        subject: "Physics",
        category: "Electromagnetics"
      }
    ],
  },
  {
    id: 3,
    title: "Chemistry Fundamentals",
    subject: "Chemistry",
    description: "Test your knowledge of basic chemistry concepts",
    duration: 40,
    negativeMarking: 0.25,
    questions: [
      {
        id: 5,
        text: "What is the atomic number of Carbon?",
        options: ["5", "6", "7", "8"],
        correctAnswer: 1,
        explanation: "Carbon has an atomic number of 6, meaning it has 6 protons in its nucleus",
        subject: "Chemistry",
      },
      {
        id: 6,
        text: "What is the chemical formula for water?",
        options: ["H2O", "CO2", "NaCl", "O2"],
        correctAnswer: 0,
        explanation: "Water's chemical formula is H2O, representing two hydrogen atoms and one oxygen atom",
        subject: "Chemistry",
      },
    ],
  },
  {
    id: 4,
    title: "Biology Basics",
    subject: "Biology",
    description: "Test your understanding of fundamental biology concepts",
    duration: 35,
    negativeMarking: 0.25,
    questions: [
      {
        id: 7,
        text: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Golgi Body", "Endoplasmic Reticulum"],
        correctAnswer: 1,
        explanation: "Mitochondria are called the powerhouse of the cell as they produce energy in the form of ATP",
        subject: "Biology",
      },
      {
        id: 8,
        text: "What is the process by which plants make their food?",
        options: ["Respiration", "Photosynthesis", "Digestion", "Absorption"],
        correctAnswer: 1,
        explanation: "Photosynthesis is the process by which plants convert light energy into chemical energy to produce glucose",
        subject: "Biology",
      },
    ],
  },
  {
    id: 5,
    title: "Computer Science",
    subject: "Computer Science",
    description: "Test your knowledge of computer science fundamentals",
    duration: 50,
    negativeMarking: 0.25,
    questions: [
      {
        id: 9,
        text: "What does CPU stand for?",
        options: ["Central Processing Unit", "Central Program Utility", "Computer Personal Unit", "Control Processing Unit"],
        correctAnswer: 0,
        explanation: "CPU stands for Central Processing Unit, which is the primary component that processes instructions in a computer",
        subject: "Computer Science",
      },
      {
        id: 10,
        text: "Which of these is not a programming language?",
        options: ["Python", "Java", "HTML", "BIOS"],
        correctAnswer: 3,
        explanation: "BIOS (Basic Input/Output System) is firmware used to perform hardware initialization, not a programming language",
        subject: "Computer Science",
      },
    ],
  },
  {
    id: 6,
    title: "General Knowledge",
    subject: "General Knowledge",
    description: "Test your general knowledge and current affairs",
    duration: 30,
    negativeMarking: 0.25,
    questions: [
      {
        id: 11,
        text: "Which is the largest planet in our solar system?",
        options: ["Mars", "Saturn", "Jupiter", "Neptune"],
        correctAnswer: 2,
        explanation: "Jupiter is the largest planet in our solar system",
        subject: "General Knowledge",
      },
      {
        id: 12,
        text: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correctAnswer: 1,
        explanation: "Romeo and Juliet was written by William Shakespeare",
        subject: "General Knowledge",
      },
    ],
  },
];
