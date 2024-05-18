"use client";

import { Question } from "@prisma/client";
import { UserWithAnswers } from "../lib/types";
import { prepareDataForSpiderChart } from "../lib/util/d3";
import SpiderChart from "./SpiderChart";

const Results = ({
  users,
  user_id,
  questions,
}: {
  users: UserWithAnswers[];
  user_id: string;
  questions: Question[];
}) => {
  const user = users.find((user) => user.id === user_id);
  if (!user) return <div>User not found</div>;
  const { averageUserAnswers, currentUserAnswers } = prepareDataForSpiderChart(
    users,
    user_id,
    questions
  );
  return (
    <div>
      <h1>Results</h1>
      <SpiderChart
        averageUserAnswers={averageUserAnswers}
        currentUserData={currentUserAnswers}
      />
    </div>
  );
};

export default Results;
