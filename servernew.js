const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/learn", (req, res) => {
  const topic = req.body.topic;

  const responses = {
    science: "Science is the study of the world around us 🔬",
    math: "Math is all about numbers and logic ➕",
    history: "History teaches us about the past 📜",
    nature: "Nature includes plants, animals, and Earth 🌿",
    space: "Space is full of stars and planets 🚀"
  };

  res.json({
    result: responses[topic] || "No topic found"
  });
});

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
