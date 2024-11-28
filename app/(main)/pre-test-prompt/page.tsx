"use client"
import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import Link from "next/link";
interface Question {
  question: string;
  options: string[];
  correct: number;
}

const questions: Question[] = [
  {
    question: "What is the main reason people invest?",
    options: [
      "To save money for short-term needs (like a vacation)",
      "To grow their money and reach long-term goals (like retirement)",
      "To buy expensive things right away",
      "To impress their friends",
    ],
    correct: 1, // "b) To grow their money and reach long-term goals (like retirement)"
  },
  {
    question: "Imagine you have $100. You could keep it safe under your mattress, or invest it. What's the biggest difference between these options?",
    options: [
      "Investing is guaranteed to make you money.",
      "Keeping money safe means it won't grow at all.",
      "Investing involves paperwork.",
      "Both options offer the same return.",
    ],
    correct: 1, // "b) Keeping money safe means it won't grow at all."
  },
  {
    question: "Let's say you invest in a company. What does it mean to 'own a piece' of that company?",
    options: [
      "You get a free product every year.",
      "You have a say in how the company is run (with enough shares).",
      "You become the company CEO.",
      "You get a special discount on their products.",
    ],
    correct: 1, // "b) You have a say in how the company is run (with enough shares)."
  },
  {
    question: "Imagine you have two piggy banks. One has all your eggs in one basket (all your money in one investment). The other piggy bank has colorful eggs (different investments). Which piggy bank is more likely to survive if one investment goes bad?",
    options: [
      "The piggy bank with all your eggs in one basket.",
      "The colorful piggy bank with different investments (diversified).",
      "Both piggy banks are equally likely to survive.",
      "Neither piggy bank would survive if one investment goes bad.",
    ],
    correct: 1, // "b) The colorful piggy bank with different investments (diversified)."
  },
  {
    question: "Which of these is NOT a common risk associated with investing?",
    options: [
      "Earning less than you expected",
      "Losing some of your money",
      "Having to wait a long time to see results",
      "Getting free money from the government",
    ],
    correct: 3, // "d) Getting free money from the government"
  },
  {
    question: "Why do people invest their money?",
    options: [
      "To save money for future expenses",
      "To grow their wealth over time",
      "To protect their money from inflation",
      "All of the above",
    ],
    correct: 3, // "d) All of the above"
  },
  {
    question: "What is the main goal of investing?",
    options: [
      "To make quick money",
      "To avoid paying taxes",
      "To grow your wealth over time",
      "To help others",
    ],
    correct: 2, // "c) To grow your wealth over time"
  },
  {
    question: "What is risk in terms of investing?",
    options: [
      "The possibility of losing money",
      "The chance of making money",
      "The cost of investing",
      "The time it takes to invest",
    ],
    correct: 0, // "a) The possibility of losing money"
  },
  {
    question: "What is the general relationship between risk and return in investing?",
    options: [
      "Higher risk usually means higher potential return",
      "Lower risk usually means higher potential return",
      "There is no relationship between risk and return",
      "Higher risk always means higher return",
    ],
    correct: 0, // "a) Higher risk usually means higher potential return"
  },
  {
    question: "What is diversification in investing?",
    options: [
      "Investing all your money in one stock",
      "Investing only in safe investments",
      "Investing in a variety of different assets",
      "Investing only in high-risk investments",
    ],
    correct: 2, // "c) Investing in a variety of different assets"
  },
];

const PreTest: React.FC = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);
  
    useEffect(() => {
      if (timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      }
    }, [timeLeft]);
  
    const handleOptionSelect = (index: number) => {
      // Update the score if the answer is correct
      if (index === questions[currentQuestion].correct) {
        setCorrectAnswers(correctAnswers + 1);
      }
  
      setSelectedOption(index);
  
      // Move to the next question after a short delay
      setTimeout(() => {
        if (currentQuestion + 1 < questions.length) {
          setCurrentQuestion(currentQuestion + 1);
          setTimeLeft(15);
          setSelectedOption(null);
        } else {
          setShowResult(true);
        }
      }, 1000);
    };
  
    const getFeedbackMessage = () => {
      if (correctAnswers < 5) {
        return "Start from scratch.";
      } else if (correctAnswers > 8) {
        return "You know the Basics!";
      } else {
        return "Start with books recommended by experts!";
      }
    };
  
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
        {showResult ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-green-600">Test Complete!</h1>
            <p className="text-lg">Thank you for participating.</p>
            <p className="text-lg font-semibold mt-4">{getFeedbackMessage()}</p>
            <Link href="/courses">
              <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Proceed to Courses
              </button>
            </Link>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Question {currentQuestion + 1} of {questions.length}</h2>
              <div className="flex items-center space-x-2 text-red-500">
                <Clock className="w-5 h-5" />
                <span>{timeLeft}s</span>
              </div>
            </div>
            <p className="text-gray-700 text-md mb-6">{questions[currentQuestion].question}</p>
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`w-full text-left p-4 border rounded-lg ${
                    selectedOption === index
                      ? index === questions[currentQuestion].correct
                        ? "bg-green-100 border-green-500"
                        : "bg-red-100 border-red-500"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleOptionSelect(index)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default PreTest;