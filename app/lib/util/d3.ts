import { Question } from "@prisma/client";
import { UserWithAnswers } from "../types";

const questionLabels: Record<string, string> = {
  "How important is good communication in a web developer?": "Communication",
  "How often do you require updates on project progress?": "Updates",
  "How important is code quality and maintainability to you?": "Code quality",
  "What impact does the developer's portfolio have on your decision to hire?":
    "Portfolio",
  "What value do you place on reducing the development timeline?": "Timeline",
  "Which programming languages do you prefer for web development?": "Languages",
  "Which web development frameworks do you prefer?": "Frameworks",
  "Which type of web projects do you usually have?": "Projects",
  "How many years of experience do you expect the developer to have?":
    "Experience",
  "Which design tools do you prefer your developers to use?": "Design tools",
};

export const prepareDataForSpiderChart = (
  users: UserWithAnswers[],
  userId: string,
  questions: Question[]
) => {
  const scaleQuestions = questions.filter((q) => q.type === "scale");

  const averageUserScaleAnswers = scaleQuestions.map((question) => {
    const answers = users.map((user) => {
      const answer = user.answers.find((ans) => ans.questionId === question.id);
      return answer ? parseFloat(answer.answer) : NaN;
    });

    // Ensure we are using only valid answers for averaging
    const validAnswers = answers.filter((value) => !isNaN(value));
    const average =
      validAnswers.length > 0
        ? validAnswers.reduce((sum, val) => sum + val, 0) / validAnswers.length
        : 0;

    return {
      axis: questionLabels[question.text] || question.text,
      value: average,
    };
  });

  const currentUserScaleAnswers = scaleQuestions.map((question) => {
    const user = users.find((user) => user.id === userId);
    const answer = user?.answers.find((ans) => ans.questionId === question.id);
    return {
      axis: questionLabels[question.text] || question.text,
      value: answer ? parseFloat(answer.answer) : 0,
    };
  });

  return { averageUserScaleAnswers, currentUserScaleAnswers };
};
