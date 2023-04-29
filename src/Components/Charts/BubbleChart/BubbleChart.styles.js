import styled from "styled-components";
const SBubbleChart = styled.div`
  margin: 3rem auto;
  max-width: 1100px;
  & > div {
    padding: 20px;
    border: 3px solid gray;
    position: relative;
    .tooltip {
      border: 2px solid lightgreen;
      border-radius: 5px;
      padding: 10px;
      color: black;
      font-weight: 700;
      font-size: 1rem;
    }
    h1 {
      color: white;
    }
    h1,
    p {
      margin: 0;
    }
    .circle-hover {
      stroke-width: 3px;
      stroke: white;
    }
  }
`;

export default SBubbleChart;
