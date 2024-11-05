import { Kafka } from "kafkajs";

import fs from "fs";
import { analyzeFeedback } from "../services/bedrockClient";

const kafka = new Kafka({
  brokers: [process.env.KAFKA_BROKER || "kafka:9092"],
});
const consumer = kafka.consumer({ groupId: "feedback-consumers" });

const writeToCSV = (feedback: string, analysis: any) => {
  const data = `${feedback}, ${JSON.stringify(analysis)}\n`;
  fs.appendFileSync("feedback_analysis.csv", data);
};

const startConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "feedback" });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const feedback = message.value?.toString() || "";
      const analysis = await analyzeFeedback(feedback);

      console.log("Feedback analyzed:", analysis);
      writeToCSV(feedback, analysis);
    },
  });
};

startConsumer().catch(console.error);
