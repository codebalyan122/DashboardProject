import { useCallback, useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import BarChart from "../Components/Charts/BarChart/BarChart";
import PieChart from "../Components/Charts/PieChart/PieChart";
import BubbleChart from "../Components/Charts/BubbleChart/BubbleChart";
import Filter from "../Components/Filter/Filter";

const Home = () => {
  const [articleData, setArticleData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const getArticleData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3001/");
      console.log(response.data);
      setArticleData(response.data);
      setFilteredData(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getArticleData();
  }, [getArticleData]);
  const handleFilters = (newData) => {
    setFilteredData(newData);
  };

  console.log(articleData, filteredData);
  return (
    <>
      <Filter data={articleData} handleFilters={handleFilters} />
      <BarChart data={filteredData} type="sector" unit="likelihood" />
      <BarChart data={filteredData} type="region" unit="relevance" />
      <div className="wrapper">
        <PieChart data={filteredData} type="start_year" unit="intensity" />

        <PieChart data={filteredData} type="end_year" unit="count" />
      </div>
      <BubbleChart
        type="country"
        xScale="likelihood"
        yScale="relevance"
        zScale="intensity"
      />
      <BubbleChart
        type="topic"
        xScale="likelihood"
        yScale="relevance"
        zScale="intensity"
      />
    </>
  );
};

export default Home;
