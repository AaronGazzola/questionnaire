"use client";

import { Question } from "@prisma/client";
import { UserWithAnswers } from "../lib/types";
import { prepareDataForSpiderChart } from "../lib/util/d3";
import SpiderChart from "./SpiderChart";
import Histogram from "./Histogram";
import { Typography } from "antd";
import useIsMounted from "../lib/hooks/useIsMounted";
import Loading from "../results/[user_id]/loading";

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
  const { averageUserScaleAnswers, currentUserScaleAnswers } =
    prepareDataForSpiderChart(users, user_id, questions);
  if (!useIsMounted()) return <Loading />;
  return (
    <div className="flex flex-col justify-center items-center">
      <Typography.Title
        className="p-4"
        level={1}
      >
        {!user ? "" : `${user.name}'s `}Results
      </Typography.Title>
      <div className="flex flex-wrap justify-center">
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
    </div>
  );
};

export default Results;
