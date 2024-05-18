import * as d3 from "d3";
import { useEffect, useRef } from "react";

type SkillData = {
  axis: string;
  value: number;
};

type SpiderChartData = SkillData[][];

function mapSkillData(skillsMap: Record<string, number>): SkillData[] {
  return Object.entries(skillsMap).map(([key, value]) => ({
    axis: key,
    value,
  }));
}

function spiderChartData(
  ...skillMaps: Record<string, number>[]
): SpiderChartData {
  return skillMaps.map(mapSkillData);
}

const SpiderChart = ({
  averageUserAnswers,
  currentUserData,
}: {
  averageUserAnswers: SkillData[];
  currentUserData: SkillData[];
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const width = 500;
    const height = 400;
    const margin = 30;
    const max = 5;
    const labelDistance = 1.2;
    const lineWidth = 2;
    const dotRadius = 3;
    const getColor = (i: number) => (i === 0 ? "blue" : "gray");

    const skillsData = spiderChartData(
      averageUserAnswers.reduce(
        (acc, curr) => ({ ...acc, [curr.axis]: curr.value }),
        {}
      ),
      currentUserData.reduce(
        (acc, curr) => ({ ...acc, [curr.axis]: curr.value }),
        {}
      )
    ).reverse();

    const radius = (height - margin * 2) / 2;
    const maxValue = d3.max(skillsData.flat().map((d) => d.value)) || max;

    const angleSlice = (Math.PI * 2) / skillsData[0].length;

    d3.select(chartRef.current).select("svg").remove();

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height + margin * 2);

    const containerWidth = width - margin * 2;
    const containerHeight = height - margin * 2;
    const container = svg
      .append("g")
      .attr("width", containerWidth)
      .attr("height", containerHeight)
      .attr(
        "transform",
        `translate(${width / 2 + margin}, ${height / 2 + margin})`
      );

    const axisGrid = container.append("g").attr("class", "axisWrapper");

    axisGrid
      .selectAll(".levels")
      .data(d3.range(1, 6).reverse())
      .enter()
      .append("circle")
      .attr("class", "gridCircle")
      .attr("r", (d) => (radius / 5) * d)
      .style("fill", "#CDCDCD")
      .style("stroke", "#CDCDCD")
      .style("fill-opacity", 0.1);

    const axesDomain = skillsData[0].map((d) => d.axis);

    const rScale = d3.scaleLinear().domain([0, maxValue]).range([0, radius]);

    const axis = axisGrid
      .selectAll(".axis")
      .data(axesDomain)
      .enter()
      .append("g")
      .attr("class", "axis");

    axis
      .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr(
        "x2",
        (d, i) =>
          rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2)
      )
      .attr(
        "y2",
        (d, i) =>
          rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2)
      )
      .attr("class", "line")
      .style("stroke", "white")
      .style("stroke-width", "2px");

    axis
      .append("text")
      .attr("class", "legend")
      .style("font-size", "12px")
      .attr("text-anchor", "middle")
      .attr("font-family", "monospace")
      .attr("dy", "0.35em")
      .attr(
        "x",
        (d, i) =>
          rScale(maxValue * labelDistance) *
          Math.cos(angleSlice * i - Math.PI / 2)
      )
      .attr(
        "y",
        (d, i) =>
          rScale(maxValue * labelDistance) *
          Math.sin(angleSlice * i - Math.PI / 2)
      )
      .text((d) => d);

    const radarLine = d3
      .lineRadial<SkillData>()
      .curve(d3.curveLinearClosed)
      .radius((d) => rScale(d.value))
      .angle((d, i) => i * angleSlice);

    const plots = container
      .append("g")
      .selectAll("g")
      .data(skillsData)
      .join("g")
      .attr("fill", (d, i) => getColor(i));

    plots
      .append("path")
      .attr("d", (d) => radarLine(d as any))
      .attr("stroke", (d, i) => getColor(i))
      .attr("stroke-width", lineWidth)
      .attr("fill", (d, i) => getColor(i))
      .attr("fill-opacity", 0.15);

    plots
      .selectAll("circle")
      .data((d) => d)
      .join("circle")
      .attr("r", dotRadius)
      .attr(
        "cx",
        (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2)
      )
      .attr(
        "cy",
        (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2)
      )
      .style("fill-opacity", 1);
  }, [averageUserAnswers, currentUserData]);

  return <div ref={chartRef}></div>;
};

export default SpiderChart;
