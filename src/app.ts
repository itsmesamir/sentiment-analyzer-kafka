import express from "express";
import { produceFeedbackMessage } from "./kafka/producer";

const app = express();
app.use(express.json());

app.post("/summarize", async (req, res) => {
  const { feedback } = req.body;
  await produceFeedbackMessage(feedback);
  res.status(200).json({ message: "Feedback submitted for analysis." });
});

app.listen(3000, () => console.log("Server running on port 3000"));
