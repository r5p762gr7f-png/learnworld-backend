import express from "express";
import cors from "cors";

const app = express();

// ✅ Important middlewares
app.use(cors());
app.use(express.json());

// ✅ Test route (to check backend)
app.get("/test", (req, res) => {
  res.json({ message: "API working ✅" });
});

// ✅ Main API route
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

// ✅ Root route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ Correct port for Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
