import type { SupportStateType } from "../graph/state.js";
import { llm } from "./llm.js";
import { searchKnowledge } from "../tools/knowledgeSearch.js";

export async function generalAgent(state: SupportStateType) {
  const category = ["shipment", "account", "order_supplies"].includes(state.category)
    ? state.category
    : undefined;

  // const query = `User Question: ${state.userQuery}\nCustomer Tier: ${state.customerTier}\nAccount Status: ${state.accountStatus}\nCountry: ${state.country}`;

  const results = searchKnowledge(state.userQuery, category);

  const context = results.length
    ? results.map((item) => `Question: ${item.question}\nAnswer: ${item.answer}`).join("\n\n")
    : "No relevant knowledge base information found.";

  return { context };
}

export { llm };