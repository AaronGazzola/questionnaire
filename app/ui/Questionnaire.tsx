"use client";

import { useState } from "react";
import Progress from "antd/es/progress";
import RadioGroup from "antd/es/radio/group";
import RadioButton from "antd/es/radio/radioButton";
import Button from "antd/es/button";
import { Question } from "@prisma/client";
import Loading from "../loading";
import useIsMounted from "../lib/hooks/useIsMounted";
import cx from "classnames";

const CircleRating = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) => {
  const circles = [1, 2, 3, 4, 5];
  return (
    <div className="flex justify-center items-center space-x-5 sm:space-x-10">
      {circles.map((circleIndex) => (
        <div
          key={circleIndex}
          onClick={() => onChange(circleIndex)}
          className={cx(
            "rounded-full cursor-pointer flex items-center justify-center transition-all duration-200",
            value === circleIndex ? "bg-blue-500" : "bg-gray-300",
            value === circleIndex ? "scale-125" : "hover:scale-110",
            circleIndex === 1
              ? "w-4 h-4"
              : circleIndex === 2
              ? "w-6 h-6"
              : circleIndex === 3
              ? "w-8 h-8"
              : circleIndex === 4
              ? "w-10 h-10"
              : "w-12 h-12"
          )}
        >
          <div
            className={cx(
              "rounded-full",
              value === circleIndex ? "w-1/2 h-1/2 bg-white" : ""
            )}
          ></div>
        </div>
      ))}
    </div>
  );
};

const Questionnaire = ({ questions }: { questions: Question[] }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleAnswerChange = (value: number | string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value.toString();
    setAnswers(newAnswers);
    setTimeout(() => handleNext(), 500);
  };

  const progressPercent = (currentQuestion / questions.length) * 100;

  if (!useIsMounted()) return <Loading />;
  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="p-5 flex flex-1 justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4 p-5">
            {questions[currentQuestion].text}
          </h2>
          {!questions[currentQuestion].options.length ? (
            <CircleRating
              value={Number(answers[currentQuestion])}
              onChange={handleAnswerChange}
            />
          ) : (
            <RadioGroup
              buttonStyle="solid"
              onChange={(e) => handleAnswerChange(e.target.value)}
              value={answers[currentQuestion]}
            >
              {questions[currentQuestion].options.map((option, index) => (
                <RadioButton
                  key={index}
                  value={option}
                  className="p-2 text-lg"
                >
                  {option}
                </RadioButton>
              ))}
            </RadioGroup>
          )}
        </div>
      </div>
      <div className="p-5">
        <Progress
          percent={progressPercent}
          showInfo={false}
        />
        <div className="flex justify-between mt-2">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentQuestion === questions.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
