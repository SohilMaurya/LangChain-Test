import "dotenv/config";
import { supportGraph } from "./graph/supportGraph.js";

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is missing. Create a .env file using .env.example.");
  }

  const query = process.argv.slice(2).join(" ") || "Where is my shipment 123456789?";

  console.log("\nUser:");
  console.log(query);
  console.log("\nProcessing...\n");

  const result = await supportGraph.invoke({ userQuery: query });

  console.log("Category:", result.category);
  console.log("Priority:", result.priority);
  console.log("\nAI Response:");
  console.log(result.response);
}

main().catch((error) => {
  console.error("\nApplication error:", error instanceof Error ? error.message : error);
  process.exit(1);
});