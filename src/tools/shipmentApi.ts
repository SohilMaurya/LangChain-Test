import shipments from "../data/shipments.json" with { type: "json" };

export interface Shipment {
  waybill: string;
  status: string;
  origin: string;
  destination: string;
  estimatedDelivery: string;
}

export async function getShipment(waybill: string): Promise<Shipment | null> {
  return shipments.find((item) => item.waybill === waybill) ?? null;
}

export async function getShipmentsByOrigin(origin: string): Promise<Shipment[]> {
  const normalizedOrigin = origin.trim().toLowerCase();

  return shipments.filter((item) => item.origin.toLowerCase() === normalizedOrigin);
}