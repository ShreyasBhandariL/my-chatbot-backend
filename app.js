require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

async function run(prompt) {
  // For text-only input, use the gemini-pro model
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

// run();
app.use(express.json());
app.use(cors({ origin: "http://127.0.0.1:5500" }));

app.post("/my-ai", async (req, res) => {
  const prompt = req.body.message;
  const answer = await run(prompt);
  res.status(200).json({ response: answer });
});

app.listen(5000, () => {
  console.log("server is running");
});
