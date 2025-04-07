import { useState } from "react";

export type Sentiment = "positive" | "negative";
export type EmailResponse = { email: string; sentiment: Sentiment };

const App = () => {
  const [positiveReplies, setPositiveReplies] = useState<EmailResponse[]>([]);
  const [negativeReplies, setNegativeReplies] = useState<EmailResponse[]>([]);

  const handleClassify = async () => {
    try {
      const response = await fetch("http://localhost:3000/generate-emails", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to classify email");
      }

      const { result } = (await response.json()) as { result: EmailResponse[] };
      console.log(result);
      result.forEach((email) => {
        if (email.sentiment === "positive") {
          setPositiveReplies((prev) => [...prev, email]);
        } else {
          setNegativeReplies((prev) => [...prev, email]);
        }
      });
    } catch (error) {
      console.error("Error classifying email:", error);
    }
  };

  return (
    <div>
      <h1>Email Reply Classifier</h1>
      <button onClick={handleClassify}>
        Generate and Classify Email Reply
      </button>
      <div>
        <h2>Positive Replies</h2>
        <ul>
          {positiveReplies.map((reply) => (
            <li>{reply.email}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Negative Replies</h2>
        <ul>
          {negativeReplies.map((reply) => (
            <li>{reply.email}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default App;
