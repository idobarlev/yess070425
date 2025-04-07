import openai from "../openaiClient";
const {
  prompts: { instructionGenerateEmailReply },
} = require("../constants");

export const generateEmails = async (
  quantity: number = 5
): Promise<string[]> => {
  try {
    const promisesToGenerateEmails = Array.from(
      { length: quantity },
      async () =>
        openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: instructionGenerateEmailReply,
            },
            { role: "user", content: "" },
          ],
          max_tokens: 70,
          temperature: 1,
        })
    );

    const result = await Promise.all(promisesToGenerateEmails);

    const emailReplies = result.map((chatResponse) => {
      const emailReply = chatResponse.choices[0].message.content?.trim();
      if (!emailReply) {
        throw new Error("No email reply generated.");
      }
      return emailReply;
    });

    return emailReplies;
  } catch (error) {
    console.error("Error generating email reply:", error);
    throw error;
  }
};
