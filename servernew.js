import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/learn", (req, res) => {
  const { topic } = req.body;

  const data = {
    science: "Science explains how the world works 🔬",
    math: "Math is about numbers and patterns ➕",
    history: "History tells us about the past 📜",
    nature: "Nature includes plants and animals 🌿",
    space: "Space has planets and stars 🚀"
  };

  res.json({
    result: data[topic] || "Topic not found"
  });
});

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(3000, () => {
  console.log("Server running");
});
