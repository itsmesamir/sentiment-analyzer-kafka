import { Kafka } from "kafkajs";

const kafka = new Kafka({
  brokers: [process.env.KAFKA_BROKER || "kafka:9092"],
});
const producer = kafka.producer();

export const produceFeedbackMessage = async (feedback: string) => {
  await producer.connect();
  await producer.send({
    topic: "feedback",
    messages: [{ value: feedback }],
  });
  await producer.disconnect();
};
