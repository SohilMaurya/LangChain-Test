import { END, START, StateGraph } from "@langchain/langgraph";
import { SupportState } from "./state.js";
import { classifyNode, generateResponseNode, knowledgeNode, routeRequest } from "./nodes.js";
import { shipmentAgent } from "../agents/shipmentAgent.js";
import { accountAgent } from "../agents/accountAgent.js";

const workflow = new StateGraph(SupportState)
  .addNode("classify", classifyNode)
  .addNode("shipment", shipmentAgent)
  .addNode("account", accountAgent)
  .addNode("general", knowledgeNode)
  .addNode("generateResponse", generateResponseNode)
  .addEdge(START, "classify")
  .addConditionalEdges("classify", routeRequest, {
    shipment: "shipment",
    account: "account",
    general: "general"
  })
  .addEdge("shipment", "generateResponse")
  .addEdge("account", "generateResponse")
  .addEdge("general", "generateResponse")
  .addEdge("generateResponse", END);

export const supportGraph = workflow.compile();