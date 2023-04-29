import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import * as d3 from "d3";
import SBubbleChart from "./BubbleChart.styles";

const BubbleChart = (props) => {
  const [ref, setRef] = useState();
  const [chartData, setChartData] = useState();
  const getArticleData = useCallback(async () => {
    const response = await axios.get("http://localhost:3001/api/topic-sector", {
      params: { data: `${props.type}` },
    });
    setChartData(response.data);
  }, [setChartData]);

  useEffect(() => {
    getArticleData();
  }, [getArticleData]);

  useEffect(() => {
    const dimensions = {
      width: 950,
      height: 550,
      margin: 10,
    };
    const svg = d3
      .select(ref)
      .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .append("g")
      .attr(
        "transform",
        `translate(${dimensions.margin + 40},${dimensions.margin + 30})`
      );

    const tooltip = d3
      .select(ref)
      .append("div")
      .attr("class", "tooltip")
      .style("display", "none")
      .style("position", "absolute")
      .text("");

    if (chartData?.length) {
      const xScale = d3
        .scaleLinear()
        .domain([
          props.type === "country" ? 1 : 0,
          d3.max(chartData, (d) => d[props.xScale]),
        ])
        .range([0, dimensions.width]);
      svg.append("g").call(d3.axisTop(xScale));

      const yScale = d3
        .scaleLinear()
        .domain([d3.max(chartData, (d) => d[props.yScale]), 0])
        .range([dimensions.height, dimensions.margin]);
      svg.append("g").call(d3.axisLeft(yScale));

      const zScale = d3
        .scaleLinear()
        .domain([
          d3.min(chartData, (d) => d[props.zScale]),
          d3.max(chartData, (d) => d[props.zScale]),
        ])
        .range([5, 35]);

      const color = d3
        .scaleOrdinal()
        .range(d3.schemeCategory10.concat(d3.schemeSet1));
      svg
        .append("g")
        .selectAll("dot")
        .data(chartData)
        .join("circle")
        .attr("class", "bubbles")
        .attr("cx", (d) => xScale(d[props.xScale]))
        .attr("cy", (d) => yScale(d[props.yScale]))
        .attr("r", (d) => zScale(d[props.zScale]))
        .style("fill", (d) => color(d[props.zScale]))
        .on("mouseover", function () {
          tooltip.style("display", "block");
          d3.select(this).classed("circle-hover", true);
        })
        .on("mousemove", function (event, d) {
          const [x, y] = d3.pointer(event, this);
          tooltip
            .html(
              `${props.type.charAt(0).toUpperCase()}${props.type.slice(
                1
              )}: ${d._id.charAt(0).toUpperCase()}${d._id.slice(1)} <br/>
              Intensity: ${d[props.zScale].toFixed(2)} <br/>
              Likelihood: ${d[props.xScale].toFixed(2)} <br/>
              Relevance: ${d[props.yScale].toFixed(2)}`
            )
            .style("left", `${x + 100}px`)
            .style("top", `${y + 50}px`)
            .style("background", color(d[props.zScale]));
        })
        .on("mouseleave", function () {
          tooltip.style("display", "none");
          d3.select(this).classed("circle-hover", false);
        });
    }
    return () => {
      d3.select(ref).select("svg").remove();
      tooltip.remove();
    };
  }, [chartData]);
  return (
    <SBubbleChart>
      <div ref={setRef}>
        <h1>BubbleChart</h1>
        <p>
          {props.type.charAt(0).toUpperCase()}
          {props.type.slice(1)} Intensity Bubble Chart: Likelihood vs. Relevance
        </p>
      </div>
    </SBubbleChart>
  );
};

export default BubbleChart;
