import AWS from "aws-sdk";
import { feedbackSummarizer } from "../utils/prompts";

const bedrock = new AWS.BedrockRuntime({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const analyzeFeedback = async (feedback: string) => {
  const modelId = process.env.LLM_MODEL_ID;

  if (!modelId) {
    throw new Error("LLM_MODEL_ID is not defined");
  }

  const params = {
    modelId,
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify({
      temperature: 0,
      top_p: 1,
      max_tokens: 20000,
      prompt: feedbackSummarizer(feedback),
    }),
  };

  const response = await bedrock.invokeModel(params).promise();

  return JSON.parse(response.body as string);
};
