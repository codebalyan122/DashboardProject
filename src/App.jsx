import { useCallback, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import SectorVsIntensity from "./Charts/SectorChart";

const App = () => {
  const [articleData, setArticleData] = useState();

  const getArticleData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/articles");
      setArticleData(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getArticleData();
  }, [getArticleData]);

  return <SectorVsIntensity data={articleData} />;
};

export default App;
