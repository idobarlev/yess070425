import openai from "../openaiClient";
import { Sentiment } from "../types";
const {
  prompts: { instructionForClassification },
} = require("../constants");

export const classifyEmailReply = async (
  email_text: string
): Promise<Sentiment> => {
  try {
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: instructionForClassification },
        { role: "user", content: email_text },
      ],
      max_tokens: 10,
      temperature: 0,
    });

    const sentiment = chatResponse.choices[0].message.content?.trim();

    const isValidSentiment = (value: string): value is Sentiment => {
      const lowerCaseResult = value.toLowerCase();
      return lowerCaseResult === "positive" || lowerCaseResult === "negative";
    };

    if (!sentiment || !isValidSentiment(sentiment)) {
      throw new Error(`Invalid sentiment received: ${sentiment}`);
    }

    return sentiment;
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    throw error;
  }
};
