import { EmailResponse } from "../types";
import { classifyEmailReply } from "./email-classification";
import { generateEmailReply } from "./email-reply";

export const processEmail = async (
  email_text: string
): Promise<EmailResponse> => {
  try {
    const classification = await classifyEmailReply(email_text);
    const emailReply = await generateEmailReply(email_text, classification);
    const classificationForReply = await classifyEmailReply(emailReply);
    return { emailResponse: emailReply, sentiment: classificationForReply };
  } catch (err) {
    console.error("Error processing email:", err);
    throw err;
  }
};
