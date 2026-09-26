import type { SupportStateType } from "../graph/state.js";
import { getShipment, getShipmentsByOrigin } from "../tools/shipmentApi.js";

function extractOriginFromQuery(query: string): string | null {
  const match = /(?:origin(?:\s+(?:country|city|location))?\s+(?:is|=)?\s*|from\s+)([A-Za-z][A-Za-z\s-]*)/i.exec(query);

  if (!match) return null;

  const origin = match[1].trim();
  return origin || null;
}

function formatShipment(shipment: { waybill: string; status: string; origin: string; destination: string; estimatedDelivery: string }) {
  return `
Shipment Information:
Waybill: ${shipment.waybill}
Status: ${shipment.status}
Origin: ${shipment.origin}
Destination: ${shipment.destination}
Estimated Delivery: ${shipment.estimatedDelivery}
`;
}

export async function shipmentAgent(state: SupportStateType) {
  if (state.waybill) {
    const shipment = await getShipment(state.waybill);

    if (!shipment) {
      return { context: `No shipment was found for waybill ${state.waybill}.` };
    }

    return { context: formatShipment(shipment) };
  }

  const origin = extractOriginFromQuery(state.userQuery);

  if (!origin) {
    return { context: "No waybill number or origin location was provided. Ask the customer for either their waybill number or shipment origin." };
  }

  const shipments = await getShipmentsByOrigin(origin);

  if (!shipments.length) {
    return { context: `No shipments were found with origin ${origin}.` };
  }

  return {
    context: shipments.map((shipment) => formatShipment(shipment)).join("\n\n")
  };
}