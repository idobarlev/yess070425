import openai from "../openaiClient";
import { Sentiment } from "../types";
const {
  prompts: { instructionGenerateEmailReply },
} = require("../constants");

export const generateEmailReply = async (
  emailText: string,
  sentiment: Sentiment
): Promise<string> => {
  try {
    const instructionWithSentiment = `${instructionGenerateEmailReply} user's sentiment is ${sentiment}.`;
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: instructionWithSentiment,
        },
        { role: "user", content: emailText },
      ],
      max_tokens: 70,
      temperature: 0.5,
    });

    const emailReply = chatResponse.choices[0].message.content?.trim();

    if (!emailReply) {
      throw new Error("No email reply generated.");
    }

    return emailReply;
  } catch (error) {
    console.error("Error generating email reply:", error);
    throw error;
  }
};
