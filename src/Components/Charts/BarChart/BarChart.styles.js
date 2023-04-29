import styled from "styled-components";

const SSectorChart = styled.div`
  margin: 5rem 0;
  & > div {
    position: relative;
    max-width: 950px;
    margin: auto;
    border: 3px solid gray;
    padding: 1.5rem 4rem;
    & > div:first-child {
      display: flex;
      justify-content: space-between;
      & > div:nth-child(2) {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1.5rem;
        button {
          width: 95px;
          border: 1px solid white;
          padding: 10px;
          border-radius: 6px;
          background-color: transparent;
          cursor: pointer;
          &:hover,
          .active {
            background-color: white;
            color: black;
          }
        }
        .active {
          background-color: white;
          color: black;
        }
      }
    }
    h1,
    p {
      margin: 0;
    }
    h1 {
      color: white;
    }

    .x-axis-label,
    .y-axis-label {
      fill: cyan;
      font-weight: 800;
      letter-spacing: 0.1em;
    }
    .tooltip {
      background-color: white;
      border: 2px solid lightgreen;
      border-radius: 5px;
      padding: 10px;
      color: black;
      font-weight: 700;
    }
    .rect-hover {
      stroke: white;
      stroke-width: 3;
    }
    @media screen and (min-width: 1500px) {
      margin-top: 8rem;
      transform: scale(1.1);
    }
  }
`;

export default SSectorChart;
