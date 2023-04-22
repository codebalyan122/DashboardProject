import { useEffect, useRef, useState } from "react";
import useOnSort from "../CustomHooks/useOnSort";
import * as d3 from "d3";

const SectorVsIntensity = (props) => {
  const ref = useRef();
  const [chartData, setChartData] = useState();
  console.log(chartData);
  useEffect(() => {
    setChartData(useOnSort(props.data));
  }, [props.data]);

  useEffect(() => {
    const dimensions = {
      width: 750,
      height: 500,
      margin: 10,
      padding: 30,
    };

    if (chartData?.length) {
      const svg = d3
        .select(ref.current)
        .append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height)
        .attr("padding", dimensions.padding);
      const yScale = d3
        .scaleBand()
        .domain(chartData.map((d) => d.sector || "Others"))
        .range([dimensions.margin, dimensions.height - dimensions.margin])
        .padding(0.4)
        .round(true);
      const xScale = d3
        .scaleLinear()
        .domain([0, d3.max(chartData, (d) => d.intensity)])
        .nice()
        .range([dimensions.margin, dimensions.width - dimensions.margin])
        .interpolate(d3.interpolateRound);

      const scaleQuantize = d3
        .scaleQuantize()
        .domain(d3.extent(chartData, (d) => d.intensity))
        .range([
          "lightgreen",
          "orange",
          "yellow",
          "lightgreen",
          "green",
          "red",
        ]);
      const axisX = d3.axisTop(xScale);
      const axisY = d3.axisLeft(yScale);
      svg
        ?.append("g")
        .attr("transform", "translate(110,16)")
        .attr("color", "#fff")
        .call(axisX);

      svg?.append("g").attr("transform", "translate(120,0)").call(axisY);

      svg
        ?.selectAll("rect")
        .data(chartData)
        .enter()
        .append("rect")
        .attr("x", 122)
        .attr("y", (d) => yScale(d.sector) || yScale("Others"))
        .attr("width", (d) => 0)
        .attr("height", yScale.bandwidth())
        .attr("fill", (d) => scaleQuantize(d.intensity))
        .transition()
        .duration(1000)
        .attr("width", (d) => xScale(d.intensity));
    }
  }, [chartData]);
  return <div ref={ref}></div>;
};

export default SectorVsIntensity;
