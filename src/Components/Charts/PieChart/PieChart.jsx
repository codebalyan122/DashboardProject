import { useEffect, useState } from "react";
import useOnSort from "../../../CustomHooks/useOnSort";
import * as d3 from "d3";
import SPieChart from "./PieChart.styles";
import useOnCount from "../../../CustomHooks/useOnCount";

const PieChart = (props) => {
  const [ref, setRef] = useState();
  const [chartData, setChartData] = useState();

  useEffect(() => {
    props.unit === "count"
      ? setChartData(useOnCount(props.data, props.type))
      : setChartData(useOnSort(props.data, props.type, props.unit));
  }, [props.data]);

  useEffect(() => {
    const dimensions = {
      width: 450,
      height: 450,
      margin: 40,
    };
    const tooltip = d3
      .select(ref)
      .append("div")
      .attr("class", "tooltip")
      .style("display", "none")
      .style("position", "absolute")
      .text("");

    if (chartData?.length) {
      const radius =
        Math.min(dimensions.width, dimensions.height) / 2 - dimensions.margin;
      const pie = d3
        .pie()
        .sort(null)
        .value((d) => d[props.unit]);
      const svg = d3
        .select(ref)
        .append("svg")
        .attr("width", dimensions.width + 50)
        .attr("height", dimensions.height)
        .append("g")
        .attr(
          "transform",
          "translate(" +
            dimensions.width / 2 +
            "," +
            dimensions.height / 2 +
            ")"
        );
      const color = d3.scaleOrdinal().range(d3.schemeSet1);
      const maxValue = d3.sum(chartData, (d) => d[props.unit]);

      const arc = d3
        .arc()
        .innerRadius(radius * 0.5)
        .outerRadius(radius * 0.8);
      const outerArc = d3
        .arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9);

      svg
        .selectAll("slices")
        .data(pie(chartData))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d) => color(d.data[props.unit]))
        .classed("piechart", true)
        .on("mouseover", () => {
          tooltip.style("display", "block");
          d3.select(this).classed("path-hover", true);
        })
        .on("mousemove", function (event, d) {
          const [x, y] = d3.pointer(event, this);
          tooltip
            .html(
              `${d.data[props.type] || "?"} : ${(
                (d.data[props.unit] * 100) /
                maxValue
              ).toFixed(2)}% &<br/>  Number of Projects: ${d.data[props.unit]}`
            )
            .style("left", `${x + 250}px`)
            .style("top", `${y + 300}px`)
            .style("background", color(d.data[props.unit]));
          d3.select(this).style("background", (d) => color(d.data[props.unit]));
        })
        .on("mouseout", () => {
          tooltip.style("display", "none");
          d3.select(this).classed("path-hover", false);
        });
      svg
        .selectAll("polylines")
        .data(pie(chartData))
        .enter()
        .append("polyline")
        .attr("stroke", "white")
        .style("fill", "none")
        .attr("stroke-width", 3)
        .attr("points", (d) => {
          const posA = arc.centroid(d);
          const posB = outerArc.centroid(d);
          const posC = outerArc.centroid(d);
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
          return [posA, posB, posC];
        });

      svg
        .selectAll("labels")
        .data(pie(chartData))
        .enter()
        .append("text")
        .attr("class", "pie-labels")
        .text((d) => {
          return d.data[props.type] || "?";
        })
        .attr("y", (d) => (d.data.start_year ? 7 : 0))
        .attr("transform", (d) => {
          const pos = outerArc.centroid(d);
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
          return "translate(" + pos + ")";
        })
        .style("text-anchor", (d) => {
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          return midangle < Math.PI ? "start" : "end";
        });
    }
    return () => {
      d3.select(ref).select("svg").remove();
      tooltip.remove();
    };
  }, [ref, chartData]);
  return (
    <SPieChart>
      <div ref={setRef}>
        <h1>Piechart</h1>
        {props.type === "start_year" ? (
          <p>Intensity Distribution by Start Year</p>
        ) : (
          <>
            <p>Ratio of projects and their ending year.</p>
            <h5>Data less than 5 has been filtered.</h5>
          </>
        )}
      </div>
    </SPieChart>
  );
};

export default PieChart;
