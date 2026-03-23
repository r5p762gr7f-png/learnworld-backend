import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY;

app.post("/generate", async (req, res) => {
  const { topic, subject } = req.body;

  const prompt = `You are a cheerful teacher for kids.

Return ONLY valid JSON.

{
  "title": "short fun title with emoji",
  "explanation": "2-3 simple fun sentences",
  "funFacts": ["fact 1", "fact 2", "fact 3"],
  "quiz": {
    "question": "question",
    "options": ["A","B","C","D"],
    "correctIndex": 0
  }
}

Topic: ${topic}
Subject: ${subject}`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();

    const raw = (data.content || []).map(c => c.text || "").join("");
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const match = cleaned.match(/\{[\s\S]*\}/);

    if (!match) throw new Error("Bad AI format");

    const lesson = JSON.parse(match[0]);

    res.json(lesson);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI failed" });
  }
});

app.listen(3000, () => {
  console.log("Server running");
});