import styled from "styled-components";
import { motion } from "framer-motion";

const SFilter = styled(motion.nav)`
  position: fixed;
  z-index: 10;
  width: 100vw;
  padding: 20px;
  top: 0;
  transition: all 1s ease-in-out;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(3px);
  z-index: 9999;
  font-weight: 700;
  
  & > :last-child {
    position: absolute;
    right: 80px;
    top: 20px;
  }
  & > button {
    width: 150px;
    height: 50px;
    background-color: transparent;
    border-radius: 6px;
    border: 3px solid white;
    cursor: pointer;
    &:hover {
      background-color: white;
      border: 3px solid lightgreen;
      color: black;
    }
  }
  .filters-wrapper {
    display: flex;
    & > div:nth-child(2) {
      flex: 1;
      padding: 20px;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 150px));
      grid-template-rows: repeat(auto-fill, 50px);
      gap: 1rem;
      button {
        height: 50px;
        word-wrap: break-word;
        cursor: pointer;
      }
    }
  }
  .filters-navigation {
    margin-left: 1rem;
    div {
      margin-top: 1rem;
      border-radius: 5px;
      border: 1px solid black;
      padding: 10px;
      width: 100px;
      height: 30px;
      color: black;
      display: flex;
      justify-content: start;
      align-items: center;
      gap: 1rem;
      position: relative;
      cursor: pointer;
      &:hover {
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
      }
      button {
        color: white;
        background-color: black;
        font-weight: 700;
        position: absolute;
        right: 5px;
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }
`;
export default SFilter;
