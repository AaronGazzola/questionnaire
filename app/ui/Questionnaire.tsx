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
import { Modal, Form, Input } from "antd";
import { submitAnswers } from "../lib/actions";
import { useRouter } from "next/navigation";

export interface AnswerData {
  answer: string;
  questionId: string;
}

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerData[]>(
    Array(questions.length).fill({ answer: "", questionId: "" })
  );
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [form] = Form.useForm();
  const router = useRouter();

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const handleNext = () => {
    if (isLastQuestion) return setModalIsOpen(true);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerChange = (value: number | string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = {
      answer: value.toString(),
      questionId: questions[currentQuestionIndex].id,
    };
    setAnswers(newAnswers);
    if (isLastQuestion) handleNext();
    else setTimeout(() => handleNext(), 500);
  };

  const handleFormSubmit = async (values: { name: string }) => {
    setIsSubmitting(true);
    const user = await submitAnswers(values.name, answers);
    setModalIsOpen(false);
    router.push(`/results/${user.id}`);
  };

  const handleValuesChange = (changedValues: any) => {
    setIsSubmitDisabled(!form.getFieldValue("name"));
  };

  const progressPercent = (currentQuestionIndex / questions.length) * 100;

  if (!useIsMounted()) return <Loading />;
  return (
    <>
      <Modal
        open={modalIsOpen}
        title="Save and submit"
        onCancel={() => setModalIsOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          onValuesChange={handleValuesChange}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>
          <Form.Item
            className="flex justify-end"
            style={{ margin: 0 }}
          >
            <Button
              type="primary"
              htmlType="submit"
              disabled={isSubmitDisabled}
              loading={isSubmitting}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <div className="h-screen flex flex-col justify-between">
        <div className="p-5 flex flex-1 justify-center items-center">
          <div className="text-center">
            <h2 className="text-2xl mb-4 p-5">
              {questions[currentQuestionIndex].text}
            </h2>
            {!questions[currentQuestionIndex].options.length ? (
              <CircleRating
                value={Number(answers[currentQuestionIndex].answer)}
                onChange={handleAnswerChange}
              />
            ) : (
              <RadioGroup
                buttonStyle="solid"
                onChange={(e) => handleAnswerChange(e.target.value)}
                value={answers[currentQuestionIndex].answer}
              >
                {questions[currentQuestionIndex].options.map(
                  (option, index) => (
                    <RadioButton
                      key={index}
                      value={option}
                      className="p-2 text-lg"
                    >
                      {option}
                    </RadioButton>
                  )
                )}
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
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!answers[currentQuestionIndex]}
            >
              {isLastQuestion ? "Finish" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Questionnaire;
