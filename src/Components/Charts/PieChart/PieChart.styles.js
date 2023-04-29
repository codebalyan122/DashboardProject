import styled from "styled-components";

const SPieChart = styled.div`
  height: 550px;
  width: 490px;
  box-sizing: border-box;
  & > div {
    position: relative;
  }
  .pie-labels {
    fill: white;
  }
  h1,
  p {
    margin: 0;
  }
  h1 {
    margin-top: 1rem;
  }
  h5 {
    margin: 0;
  }
  .tooltip {
    background-color: white;
    border: 2px solid lightgreen;
    border-radius: 5px;
    padding: 10px;
    color: black;
    font-weight: 700;
  }
  .piechart {
    stroke-width: 1px;
    opacity: 0.85;
    &:hover {
      opacity: 1;
    }
  }
  .pie-hover {
  }
`;

export default SPieChart;
