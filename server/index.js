import express from "express";
import importData from "./db.js";
import dotenv from "dotenv";
import dashboardData from "./dashboardData.js";
import cors from "cors";
import mongoose from "mongoose";
const port = 3001;
const app = express();

app.use(express.json());
app.use(cors());

dotenv.config({ path: "./.env" });

const mongoURI = process.env.MONGO_DB_URI;

mongoose
  .connect(mongoURI)
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

app.get("/", async (req, res) => {
  try {
    const response = await dashboardData.find({});
    res.json(response);
  } catch (err) {
    res.status(500).json("Internal Server Error");
    console.log(err);
  }
});

app.get("/api/topic-sector", async (req, res) => {
  try {
    const response = await dashboardData
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
      .exec();
    res.json(response);
  } catch (err) {
    res.status(500).json("Internal Server Error");
    console.log(err);
  }
});

app.get("/api/filters", async (req, res) => {
  try {
    const response = await dashboardData
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
      .exec();
    res.json(response);
  } catch (err) {
    res.status(500).json("Internal Server Error");
    console.log(err);
  }
});

// importData();

app.listen(port, () => {
  console.log(`Listening to ${port}`);
});
