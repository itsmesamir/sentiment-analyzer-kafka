import { analyzeFeedback } from "./bedrockClient";
import fs from "fs";

export const processFeedback = async (feedback: string) => {
  try {
    const analysisResult = await analyzeFeedback(feedback);
    const summary = {
      feedback,
      analysis: analysisResult,
    };

    fs.appendFileSync("feedback_summary.json", JSON.stringify(summary) + "\n");
    console.log("Feedback summarized:", summary);
  } catch (error) {
    console.error("Error processing feedback:", error);
  }
};
