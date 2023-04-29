import { useCallback, useEffect, useRef, useState } from "react";
import useOnSort from "../../../CustomHooks/useOnSort";
import * as d3 from "d3";
import SSectorChart from "./BarChart.styles";

const BarChart = (props) => {
  const ref = useRef();
  const [chartData, setChartData] = useState();
  const [clicked, setClicked] = useState();
  const memorizedChartData = useCallback(
    () => useOnSort(props.data, props.type, props.unit),
    [props.data]
  );
  useEffect(() => {
    setChartData(memorizedChartData());
  }, [props.data]);

  useEffect(() => {
    setClicked(false);
    const dimensions = {
      width: 950,
      height: 550,
      margin: 10,
    };
    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height);

    const tooltip = d3
      .select(ref.current)
      .append("div")
      .attr("class", "tooltip")
      .style("display", "none")
      .style("position", "absolute")
      .text("");

    if (chartData?.length) {
      const yScale = d3
        .scaleBand()
        .domain(chartData.map((d) => d[props.type] || "Others"))
        .range([dimensions.margin + 36, dimensions.height])
        .padding(0.4);

      const xScale = d3
        .scaleLinear()
        .domain([0, d3.max(chartData, (d) => d[props.unit]) + 1])
        .range([dimensions.margin, dimensions.width]);

      const scaleOrdinal = d3
        .scaleOrdinal()
        .domain(d3.extent(chartData, (d) => d[props.unit]))
        .range([
          "#ffeead",
          "#ffcc5c",
          "#ff6f69",
          "#ffd7ba",
          "#84fab0",
          "#8ecae6",
          "#ffc2b4",
          "#ff9b9d",
          "#b5e48c",
          "#d4e6b5",
          "#f0f5c4",
          "#f9dcc4",
          "#f0b5b3",
          "#ffcc8c",
          "#a1c4fc",
          "#f8edeb",
          "#f2f2f2",
          "#c5e8d8",
          "#e3d7ff",
        ]);

      const axisX = d3.axisTop(xScale);
      const axisY = d3.axisLeft(yScale);
      svg
        .append("g")
        .attr("transform", "translate(140,40)")
        .attr("color", "#fff")
        .attr("stroke-width", "3")
        .call(axisX);

      svg
        .append("g")
        .attr("transform", "translate(150,0)")
        .attr("stroke-width", "3")
        .call(axisY)
        .style("font-size", "13px");

      // svg
      //   .append("text")
      //   .attr("class", "x-axis-label")
      //   .attr("x", 500)
      //   .attr("y", 13)
      //   .text(`${props.unit.toUpperCase()}`);

      // svg
      //   .append("text")
      //   .attr("class", "y-axis-label")
      //   .attr("x", -310)
      //   .attr("y", 15)
      //   .attr("transform", "rotate(-90)")
      //   .text(`${props.type.toUpperCase()}`);

      svg
        .selectAll("rect")
        .data(chartData)
        .enter()
        .append("rect")
        .attr("x", 152)
        .attr("y", (d) => yScale(d[props.type]) || yScale("Others"))
        .attr("width", 0)
        .attr("height", yScale.bandwidth())
        .attr("fill", (d) => scaleOrdinal(d[props.unit]))
        .on("mouseover", function (event, d) {
          tooltip.style("display", "block");
          d3.select(this).classed("rect-hover", true);
        })
        .on("mouseout", function () {
          tooltip.style("display", "none");
          d3.select(this).classed("rect-hover", false);
        })
        .on("mousemove", function (event, d) {
          const [x, y] = d3.pointer(event, this);
          tooltip
            .text(
              `${d[props.type] || "Others"} : ${props.unit
                .charAt(0)
                .toUpperCase()}${props.unit.slice(1)} - ${d[props.unit].toFixed(
                2
              )}`
            )
            .style("left", `${x + 100}px`)
            .style("top", `${y + 70}px`)
            .style("background", scaleOrdinal(d[props.unit]));
        })
        .transition()
        .duration(1500)
        .attr("width", (d) => xScale(d[props.unit]));
    }
    return () => {
      svg.remove();
      tooltip.remove();
    };
  }, [chartData, ref, clicked]);

  const buttonActive = (e) => {
    d3.select(ref.current).selectAll("button").classed("active", false);
    e.target.classList.add("active");
  };
  return (
    <SSectorChart>
      <div ref={ref}>
        <div>
          <div>
            <h1>Bar Chart</h1>
            <p>
              {props.type.charAt(0).toUpperCase() + props.type.slice(1)}-wise{" "}
              {props.unit.charAt(0).toUpperCase() + props.unit.slice(1)}{" "}
              Comparison
            </p>
          </div>
          <div>
            <button
              onClick={(e) => {
                buttonActive(e);
                chartData.sort((a, b) => {
                  return a[props.unit] - b[props.unit];
                });
                setClicked(true);
              }}
            >
              Ascending
            </button>
            <button
              onClick={(e) => {
                buttonActive(e);
                chartData.sort((a, b) => {
                  return b[props.unit] - a[props.unit];
                });
                setClicked(true);
              }}
            >
              Descending
            </button>
            <button
              onClick={(e) => {
                buttonActive(e);
                chartData.sort((a, b) => {
                  return a[props.type].localeCompare(b[props.type]);
                });
                setClicked(true);
              }}
            >
              Alphabetical
            </button>
          </div>
        </div>
      </div>
    </SSectorChart>
  );
};

export default BarChart;
