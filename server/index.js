import express from "express";
import mongoConnection from "./db.js";
import cors from "cors";
const port = 3001;
const app = express();

app.use(express.json());
app.use(cors());
app.get("/api/articles", async (req, res) => {
  const db = await mongoConnection();
  try {
    const response = await db.find({}).toArray();
    res.json(response);
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Listening to ${port}`);
});
