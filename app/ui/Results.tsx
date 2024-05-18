"use client";

import { Question } from "@prisma/client";
import { UserWithAnswers } from "../lib/types";
import { prepareDataForSpiderChart } from "../lib/util/d3";
import SpiderChart from "./SpiderChart";
import Histogram from "./Histogram";

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
  const { averageUserScaleAnswers, currentUserScaleAnswers } =
    prepareDataForSpiderChart(users, user_id, questions);
  return (
    <div>
      <h1>Results</h1>
      <SpiderChart
        averageUserAnswers={averageUserScaleAnswers}
        currentUserData={currentUserScaleAnswers}
      />
      <Histogram
        questions={questions}
        users={users}
        user_id={user_id}
      />
    </div>
  );
};

export default Results;
