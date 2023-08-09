import fs from "fs";
import dashboardData from "./dashboardData.js";

const data = JSON.parse(fs.readFileSync("./jsondata.json", "utf-8"));
const importData = async () => {
  try {
    await dashboardData.create(data);
    console.log("data successfully imported");
    // to exit the process
    process.exit();
  } catch (error) {
    console.log("error", error);
  }
};

export default importData;
