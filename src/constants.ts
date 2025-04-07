export const prompts = {
  instructionForClassification:
    "Classify the sentiment of the following email reply: \\n\\n'{email_text}'\\n\\nIs it Positive or Negative?",
  instructionGenerateEmailReply:
    "Generate a professional email reply to a sales email. The sentiment should be either positive, neutral, or negative.",
} as const;
