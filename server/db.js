import { MongoClient } from "mongodb";

const mongoConnection = async () => {
  try {
    const url = "mongodb://0.0.0.0:27017";
    const client = new MongoClient(url);
    await client.connect();

    console.log("DB Connected");

    const db = client.db("assignment");
    const collection = db.collection("articleInsight");
    return collection;
  } catch (err) {
    console.log(err);
  }
};

export default mongoConnection;
