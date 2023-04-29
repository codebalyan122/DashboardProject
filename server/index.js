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
    res.status(500).json("Internal Server Error");
    console.log(err);
  }
});

app.get("/api/topic-sector", async (req, res) => {
  const db = await mongoConnection();
  try {
    const response = await db
      .aggregate([
        {
          $group: {
            _id: `$${req.query.data}`,
            intensity: { $avg: "$intensity" },
            relevance: { $avg: "$relevance" },
            likelihood: { $avg: "$likelihood" },
          },
        },
      ])
      .toArray();
    res.json(response);
  } catch (err) {
    res.status(500).json("Internal Server Error");
    console.log(err);
  }
});

app.get("/api/filters", async (req, res) => {
  const db = await mongoConnection();
  try {
    const response = await db
      .aggregate([
        {
          $group: {
            _id: null,
            Year: { $addToSet: "$end_year" },
            Topic: { $addToSet: "$topic" },
            Sector: { $addToSet: "$sector" },
            Region: { $addToSet: "$region" },
            Pestle: { $addToSet: "$pestle" },
            Source: { $addToSet: "$source" },
            Country: { $addToSet: "$country" },
          },
        },
      ])
      .toArray();
    res.json(response);
  } catch (err) {
    res.status(500).json("Internal Server Error");
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Listening to ${port}`);
});
