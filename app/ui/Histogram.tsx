import { useEffect, useRef, useState } from "react";
import { Pagination } from "antd";
import * as d3 from "d3";
import { Question, Answer } from "@prisma/client";
import { UserWithAnswers } from "../lib/types";

const Histogram = ({
  questions,
  users,
  user_id,
}: {
  questions: Question[];
  users: UserWithAnswers[];
  user_id: string;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const svgRef = useRef<SVGSVGElement>(null);
  const user = users.find((user) => user.id === user_id);
  const multipleChoiceQuestions = questions.filter(
    (question) => question.type === "multiple-choice"
  );

  const currentQuestion = multipleChoiceQuestions[currentPage - 1];

  useEffect(() => {
    if (!currentQuestion) return;

    const userAnswers = users.flatMap((user) =>
      user.answers.filter((answer) => answer.questionId === currentQuestion.id)
    );

    const optionCounts = currentQuestion.options.map((option) => ({
      option,
      count: userAnswers.filter((answer) => answer.answer === option).length,
    }));

    const userAnswer = user?.answers.find(
      (answer) => answer.questionId === currentQuestion.id
    )?.answer;

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(currentQuestion.options)
      .range([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(optionCounts, (d) => d.count) as number])
      .nice()
      .range([height, 0]);

    svg
      .append("g")
      .selectAll(".bar")
      .data(optionCounts)
      .enter()
      .append("rect")
      .attr("class", (d) => (d.option === userAnswer ? "bar selected" : "bar"))
      .attr("x", (d) => x(d.option)!)
      .attr("y", (d) => y(d.count))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.count))
      .attr("fill", (d) => (d.option === userAnswer ? "blue" : "gray"));

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));

    return () => {
      d3.select(svgRef.current).selectAll("*").remove();
    };
  }, [currentPage, multipleChoiceQuestions, users, user, currentQuestion]);

  return (
    <div>
      <h1>{currentQuestion.text}</h1>
      <svg ref={svgRef}></svg>
      <Pagination
        current={currentPage}
        total={multipleChoiceQuestions.length}
        pageSize={1}
        onChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Histogram;
