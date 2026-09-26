import { llm } from "../agents/llm.js";
import type { SupportStateType } from "./state.js";
import { classificationPrompt, responsePrompt } from "../prompts/prompts.js";
import { searchKnowledge } from "../tools/knowledgeSearch.js";

function cleanJson(content: string) {
  const match = content.match(/\{[\s\S]*\}/);
  return match ? match[0] : content;
}

export async function classifyNode(state: SupportStateType) {
  const prompt = classificationPrompt.replace("{query}", state.userQuery);
  const result = await llm.invoke(prompt);
  const content = typeof result.content === "string"
    ? result.content
    : JSON.stringify(result.content);

  let parsed: {
    category?: string;
    priority?: string;
    waybill?: string | null;
    accountNumber?: string | null;
  };

  try {
    parsed = JSON.parse(cleanJson(content));
  } catch {
    parsed = {};
  }

  const validCategories = ["shipment", "account", "order_supplies", "general"];
  const category = validCategories.includes(parsed.category ?? "")
    ? parsed.category!
    : "general";

  return {
    category,
    priority: ["low", "normal", "high"].includes(parsed.priority ?? "")
      ? parsed.priority!
      : "normal",
    waybill: parsed.waybill ?? null,
    accountNumber: parsed.accountNumber ?? null
  };
}

export function routeRequest(state: SupportStateType) {
  if (state.category === "shipment") return "shipment";
  if (state.category === "account") return "account";
  return "general";
}

export async function knowledgeNode(state: SupportStateType) {
  const results = searchKnowledge(state.userQuery, state.category);
  const context = results.length
    ? results.map((item) => `Question: ${item.question}\nAnswer: ${item.answer}`).join("\n\n")
    : "No relevant knowledge base information found.";
  return { context };
}

export async function generateResponseNode(state: SupportStateType) {
  const prompt = responsePrompt
    .replace("{query}", state.userQuery)
    .replace("{context}", state.context);

  const result = await llm.invoke(prompt);
  const response = typeof result.content === "string"
    ? result.content
    : JSON.stringify(result.content);

  return { response };
}