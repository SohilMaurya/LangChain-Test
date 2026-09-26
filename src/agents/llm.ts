// import { ChatOpenAI } from "@langchain/openai";

// export const llm = new ChatOpenAI({
//   model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
//   temperature: 0
// });


import "dotenv/config";
import { ChatGroq } from "@langchain/groq";

export const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: process.env.GROQ_MODEL ?? "openai/gpt-oss-20b",
  temperature: 0
});