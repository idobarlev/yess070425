import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { classifyEmailReply } from "./email-helper/email-classification";
import { generateEmails } from "./email-helper/generate-emails";
import { processEmail } from "./email-helper/process-email";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.post(
  "/reply-with-classification",
  async (req: Request, res: Response): Promise<any> => {
    const { email_text } = req.body;

    if (email_text == null) {
      return res.status(400).json({ error: "email_text is required" });
    }

    try {
      const result = await processEmail(email_text);
      res.json({ result });
    } catch (error) {
      console.error("Error classifying email:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

app.get(
  "/generate-emails",
  async (_req: Request, res: Response): Promise<any> => {
    try {
      const result = await generateEmails();
      const resultWithClassification = result.map(async (email) => ({
        email,
        classification: await classifyEmailReply(email),
      }));

      Promise.all(resultWithClassification).then((classifiedEmails) => {
        res.json({ result: classifiedEmails });
      });
    } catch (error) {
      console.error("Error classifying email:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
