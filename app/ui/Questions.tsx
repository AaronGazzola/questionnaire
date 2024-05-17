"use client";
import { Question } from "@prisma/client";
import React from "react";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Radio from "antd/lib/radio";
import Rate from "antd/lib/rate";
import Button from "antd/lib/button";

interface Props {
  questions: Question[];
  onSubmit: (values: any) => void;
}

const Questionnaire: React.FC<Props> = ({ questions, onSubmit }) => {
  const [form] = Form.useForm();

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case "multiple-choice":
        return (
          <Form.Item
            name={question.id}
            label={question.text}
            rules={[{ required: true, message: "Please select an option!" }]}
          >
            <Radio.Group>
              {question.options?.map((option, index) => (
                <Radio
                  key={index}
                  value={option}
                >
                  {option}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        );
      case "scale":
        return (
          <Form.Item
            name={question.id}
            label={question.text}
            rules={[{ required: true, message: "Please rate!" }]}
          >
            <Rate count={5} />
          </Form.Item>
        );
      default:
        return null;
    }
  };

  const handleFinish = (values: any) => {
    onSubmit(values);
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
    >
      {questions.map((question) => (
        <React.Fragment key={question.id}>
          {renderQuestion(question)}
        </React.Fragment>
      ))}
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Questionnaire;
